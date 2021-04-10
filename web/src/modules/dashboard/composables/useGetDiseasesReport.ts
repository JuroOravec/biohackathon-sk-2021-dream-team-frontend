import { inject, Ref, ref } from '@vue/composition-api';

import { ConfigKey } from '@/plugins/config';
import type { EnvironmentConfig } from '@/plugins/config/config';
import type { Disease } from './useGetDiseases';
import type { Organism } from './useGetOrganisms';

interface Publication {
  outlet: string;
  title: string;
  year: number;
  url: string;
}

interface DiseasesReportInputOrganism extends Pick<Organism, 'id'> {
  abundance: 'Elevated' | 'Reduced';
}

interface DiseasesReportInput {
  items: DiseasesReportInputOrganism[]
}

interface DiseaseReportResponse {
  items: {
    id: number;
    name: string;
    probability: number;
    hits: number;
    publications: Publication[]
  }[];
}

interface DiseaseReport {
  diseaseId: Disease['id'];
  diseaseName: Disease['name'];
  probability: number;
  hits: number;
  publications: Publication[];
}


interface UseGetDiseasesReport {
  diseaseReports: Ref<DiseaseReport[]>;
  loading: Ref<boolean>;
  error: Ref<Error | null>;
}

const useGetDiseasesReport = (reportedOrganisms: DiseasesReportInputOrganism[]): UseGetDiseasesReport => {
  const config = inject<EnvironmentConfig>(ConfigKey);

  const diseaseReports: Ref<DiseaseReport[]> = ref([]);
  const error: Ref<null | Error> = ref(null);
  const loading: Ref<boolean> = ref(true);

  const input: DiseasesReportInput = {
    items: reportedOrganisms,
  };

  fetch(`${config!.BACKEND_URL}/organisms`, { method: 'POST', body: JSON.stringify(input ?? {}) })
    .then((response) => response.json())
    .then((data: DiseaseReportResponse) => {
      diseaseReports.value = data.items.map((report): DiseaseReport => ({
        diseaseId: report.id,
        diseaseName: report.name,
        probability: report.probability,
        hits: report.hits,
        publications: report.publications,
      }));
    })
    .catch((err) => {
      error.value = err;
    })
    .finally(() => {
      loading.value = false;
    })

  return {
    diseaseReports,
    loading,
    error,
  };
};

export default useGetDiseasesReport;
