<template>
  <ConfirmDialogGuard
    :confirm-dialog="SaveDialogSmall"
    :open-on-route-leave="!diseaseReports.length && hasUnconfirmedChanges"
    :confirm-events="['confirm', 'discard']"
    :pause-navigation="loadingOrWaiting"
    @confirm="onSubmit"
    @discard="onDiscard"
  >
    <v-row class="ProfilePreferences">
      <v-col v-if="!diseaseReports.length">
        <ProfileCard>
          <v-col class="col-12 text-right">
            <v-tooltip left max-width="200">
              <template #activator="{ on, attrs }">
                <v-icon v-bind="attrs" v-on="on"> help </v-icon>
              </template>
              Zadajte relatívnu hodnotu výskytu baktérií podľa výsledkov Vašich testov.
            </v-tooltip>
          </v-col>
          <v-col class="col-12 text-right">
            <v-form>
              <v-row
                v-for="index in range((reportInputForm.organisms || []).length + 1)"
                :key="index"
              >
                <v-col :cols="$vuetify.breakpoint.smAndDown ? 12 : undefined">
                  <v-autocomplete
                    clearable
                    :items="organismItems"
                    :loading="isLoadingOrganisms"
                    :input-value="
                      reportInputForm.organisms &&
                      reportInputForm.organisms[index] &&
                      reportInputForm.organisms[index].id
                    "
                    item-text="name"
                    item-value="id"
                    label="Organizmus"
                    placeholder="Vyhľadaj organizmus"
                    @change="
                      (newOrganismId) =>
                        updateNthOrganismInput(
                          index,
                          isNil(newOrganismId) ? null : { id: newOrganismId }
                        )
                    "
                  ></v-autocomplete>
                </v-col>
                <v-col class="col-auto" :class="{ 'pt-0': $vuetify.breakpoint.smAndDown }">
                  <v-select
                    :value="
                      reportInputForm.organisms &&
                      reportInputForm.organisms[index] &&
                      reportInputForm.organisms[index].abundance
                    "
                    :items="abundanceOptions"
                    label="Relatívne množstvo"
                    :class="{ 'pt-0': $vuetify.breakpoint.smAndDown }"
                    @change="
                      (newAbundance) =>
                        updateNthOrganismInput(
                          index,
                          isNil(newAbundance) ? null : { abundance: newAbundance }
                        )
                    "
                  ></v-select>
                </v-col>
              </v-row>
            </v-form>
          </v-col>
        </ProfileCard>

        <ProfileCard>
          <ProfileFormSubmit
            :submit-disabled="!formIsValid || !hasUnconfirmedChanges || updateInProgress"
            :discard-disabled="!hasUnconfirmedChanges || updateInProgress"
            :submit-is-loading="updateInProgress"
            :disabled="updateInProgress"
            @submit="onSubmit"
            @discard="onDiscard"
          >
            <template #submit-action> Pokračovať </template>
            <template #discard-action> Zmazať </template>
          </ProfileFormSubmit>
        </ProfileCard>
      </v-col>

      <v-col v-else>
        <v-data-table
          :headers="reportHeaders"
          :items="diseaseReports"
          item-key="diseaseId"
          show-expand
          :items-per-page="20"
          :expanded.sync="expandedRows"
          @click:row="toggleExpandRow"
        >
          <template v-slot:expanded-item="{ headers, item }">
            <td :colspan="headers.length" class="py-2">
              <v-row>
                <v-col v-if="item.wikiSummary">
                  {{ truncate(item.wikiSummary || '', { length: 200 }) }} (<a
                    :href="item.wikiUrl" target="_blank" rel="no-referrer"
                  >Wikipedia
                    <v-icon small>
                      open_in_new
                    </v-icon>
                  </a>)
                </v-col>
              </v-row>

              <template v-if="item.publications.length">
                <v-row>
                  <v-col>
                    <v-divider />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col class="font-weight-bold">
                    Publikácie:
                  </v-col>
                </v-row>
                <v-row v-for="publication in item.publications" :key="publication.url">
                  <v-col>
                    <span class="font-italic">{{ publication.title }}</span>
                    {{ publication.year }}
                    (<a
                      :href="publication.url" target="_blank" rel="no-referrer"
                    >{{ publication.outlet }}
                      <v-icon small>
                        open_in_new
                      </v-icon>
                    </a>)
                  </v-col>
                </v-row>
              </template>

              <v-row>
                <v-col>
                  <v-divider />
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <a
                    v-if="!isNil(item.meddraId)"
                    :href="`https://bioportal.bioontology.org/ontologies/MEDDRA/${item.meddraId}`"
                    target="_blank"
                    rel="no-referrer"
                  >MedDRA ID: {{ item.meddraId }}
                    <v-icon small>
                      open_in_new
                    </v-icon>
                  </a>
                  <span
                    v-else
                  >
                    MedDRA ID: <span class="font-italic">Žiadne</span>
                  </span>
                </v-col>
              </v-row>
            </td>
          </template>

          <!-- eslint-disable-next-line  -->
          <template #item.probability="{ item }">
            {{ round(item.probability, 3) }}
          </template>

          <!-- eslint-disable-next-line  -->
          <template #item.publications="{ item }">
            {{ item.publications.length }}
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </ConfirmDialogGuard>
</template>

<script lang="ts">
import { defineComponent, unref, computed, ref, watch, Ref } from '@vue/composition-api';
import range from 'lodash/range';
import isNil from 'lodash/isNil';
import truncate from 'lodash/truncate';
import round from 'lodash/round';
import xorBy from 'lodash/xorBy';

import useFormData from '@/modules/utils/composables/useFormData';
import useValidators from '@/modules/utils/composables/useValidators';
import ConfirmDialogGuard from '@/modules/utils/components/ConfirmDialogGuard.vue';
import SaveDialogSmall from '@/modules/utils/components/SaveDialogSmall.vue';
import ProfileCard from './ProfileCard.vue';
import ProfileFormCheckbox from './ProfileFormCheckbox.vue';
import ProfileFormTextarea from './ProfileFormTextarea.vue';
import ProfileFormSubmit from './ProfileFormSubmit.vue';
import useGetOrganisms, { Organism } from '../composables/useGetOrganisms';
import useGetDiseasesReport, {
  Abundance,
  DiseaseReport,
  DiseasesReportInputOrganism,
} from '../composables/useGetDiseasesReport';

interface DiseaseReportFormData {
  organisms: DiseasesReportInputOrganism[];
}

const abundanceOptions: { text: string; value: Abundance }[] = [
  {
    text: 'Zvýšené',
    value: Abundance.ELEVATED,
  },
  {
    text: 'Znížené',
    value: Abundance.REDUCED,
  },
];

const ProfilePreferences = defineComponent({
  name: 'ProfilePreferences',
  components: {
    ProfileCard,
    ProfileFormCheckbox,
    ProfileFormTextarea,
    ProfileFormSubmit,
    ConfirmDialogGuard,
  },
  setup() {
    const loadingOrWaiting: Ref<boolean> = computed(() => unref(false));
    const updateInProgress: Ref<boolean> = ref(false);
    const reportInput: Ref<DiseasesReportInputOrganism[]> = ref([]);
    const expandedRows: Ref<DiseaseReport[]> = ref([]);

    const { organisms, loading: isLoadingOrganisms } = useGetOrganisms();
    const { loading: isLoadingReport, diseaseReports } = useGetDiseasesReport(reportInput);

    const {
      formData: reportInputForm,
      updateFormData,
      resetFormData,
      hasUnconfirmedChanges,
    } = useFormData<DiseaseReportFormData>({ defaults: { organisms: [] } });

    const organismItems = computed((): Organism[] =>
      organisms.value.map((org) => ({
        ...org,
        // Disable those items that've been already selected
        disabled: !isNil(
          reportInputForm.value.organisms?.find((otherOrg) => otherOrg.id === org.id)
        ),
      }))
    );

    const updateNthOrganismInput = (
      index: number,
      organism: Partial<DiseasesReportInputOrganism> | null
    ) => {
      const newOrganisms = reportInputForm.value.organisms?.slice() ?? [];
      const oldOrganism = newOrganisms[index];

      if (organism) {
        const newOrganism = { ...oldOrganism, ...organism };
        if (isNil(newOrganism.abundance)) {
          newOrganism.abundance = Abundance.ELEVATED;
        }
        newOrganisms.splice(index, 1, newOrganism);
      } else {
        newOrganisms.splice(index, 1);
      }
      updateFormData({ organisms: newOrganisms });
    };

    const { isValid: formIsValid, errors: formDataErrors } = useValidators(reportInputForm, {});

    const onSubmit = () => {
      const formData = unref(reportInputForm);

      reportInput.value = (formData.organisms ?? []).filter((org) => !isNil(org.id));
    };

    const onDiscard = () => resetFormData();

    const toggleExpandRow = (item: DiseaseReport): void => {
      expandedRows.value = xorBy(expandedRows.value, [item], (item) => item.diseaseId);
    };

    const reportHeaders = [
      {
        text: 'Choroba',
        align: 'start',
        value: 'diseaseName',
      },
      {
        text: 'Riziko',
        value: 'probability',
      },
      {
        text: 'Nálezy',
        value: 'hits',
      },
      {
        text: 'Publikácie',
        value: 'publications',
      },
      { text: '', value: 'data-table-expand' },
    ];

    return {
      reportInputForm,
      onSubmit,
      onDiscard,
      hasUnconfirmedChanges,
      updateInProgress,
      loadingOrWaiting,
      SaveDialogSmall,
      formDataErrors,
      formIsValid,
      organismItems,
      isLoadingOrganisms,
      abundanceOptions,
      updateNthOrganismInput,
      range,
      isNil,
      isLoadingReport,
      diseaseReports,
      reportHeaders,
      expandedRows,
      truncate,
      round,
      toggleExpandRow,
    };
  },
});

export default ProfilePreferences;
</script>

<style lang="scss">
@import '~vuetify/src/styles/main';
.ProfilePreferences {
  min-width: 300px;

  .ProfileFormCheckbox:nth-child(1) .v-input--checkbox {
    margin-top: 0 !important;
  }
  .ProfileFormTextarea .v-textarea {
    @extend .pt-2;
  }
}
</style>
