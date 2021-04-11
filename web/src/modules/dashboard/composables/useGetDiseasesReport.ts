import { inject, isRef, Ref, ref, watch } from '@vue/composition-api';
import sortBy from 'lodash/sortBy';

import { ConfigKey } from '@/plugins/config';
import type { EnvironmentConfig } from '@/plugins/config/config';
import type { Disease } from './useGetDiseases';
import type { Organism } from './useGetOrganisms';
import OptionalRef from '@/modules/utils-reactivity/types/OptionalRef';

export enum Abundance {
  ELEVATED = 'Elevated',
  REDUCED = 'Reduced',
}

interface Publication {
  outlet: string;
  title: string;
  year: number;
  url: string;
}

export interface DiseasesReportInputOrganism extends Pick<Organism, 'id'> {
  abundance: Abundance;
}

export interface DiseasesReportInput {
  items: DiseasesReportInputOrganism[]
}

interface DiseaseReportResponse {
  items: {
    id: number;
    name: string;
    probability: number;
    hits: number;
    publications: Publication[];
    meddra_id: number;
    wiki_summary: string;
    wiki_url: string;
  }[];
}

export interface DiseaseReport {
  diseaseId: Disease['id'];
  diseaseName: Disease['name'];
  probability: number;
  hits: number;
  meddraId: number;
  publications: Publication[];
  wikiSummary: string;
  wikiUrl: string;
}


interface UseGetDiseasesReport {
  diseaseReports: Ref<DiseaseReport[]>;
  loading: Ref<boolean>;
  error: Ref<Error | null>;
}

const useGetDiseasesReport = (reportedOrganisms: OptionalRef<DiseasesReportInputOrganism[]>): UseGetDiseasesReport => {
  const config = inject<EnvironmentConfig>(ConfigKey);
  const reportedOrganismsRef = isRef(reportedOrganisms) ? reportedOrganisms : ref(reportedOrganisms);

  const diseaseReports: Ref<DiseaseReport[]> = ref([]);
  const error: Ref<null | Error> = ref(null);
  const loading: Ref<boolean> = ref(true);
  const input: Ref<DiseasesReportInput> = ref({ items: [] });

  const fetchReports = () => {
    if (!input.value?.items.length) {
      diseaseReports.value = [];
      loading.value = false;
      error.value = null;
      return;
    }

    fetch(`${config!.BACKEND_URL}/organisms`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(input.value ?? {}),
    })
    .then((response) => response.json())
    .then((data: DiseaseReportResponse) => {
      diseaseReports.value = sortBy(
        data.items.map((report): DiseaseReport => ({
          diseaseId: report.id,
          diseaseName: report.name,
          probability: report.probability,
          hits: report.hits,
          publications: report.publications,
          meddraId: report.meddra_id,
          wikiSummary: report.wiki_summary,
          wikiUrl: report.wiki_url,
        })),
        item => -1 * item.probability,
      );
      error.value = null;
    })
    .catch((err) => {
      diseaseReports.value = [];
      error.value = err;
    })
    .finally(() => {
      loading.value = false;
    });
  }

  watch(reportedOrganismsRef, () => {
    input.value = ({
      items: reportedOrganismsRef.value.map((org) => ({ ...org, name: org.id })),
    });
    fetchReports();
  });

  return {
    diseaseReports,
    loading,
    error,
  };
};

export default useGetDiseasesReport;
