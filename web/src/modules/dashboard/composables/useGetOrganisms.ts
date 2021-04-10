import { inject, Ref, ref } from '@vue/composition-api';

import { ConfigKey } from '@/plugins/config';
import type { EnvironmentConfig } from '@/plugins/config/config';

export interface Organism {
  id: number;
  name: string;
}

interface UseGetOrganism {
  organisms: Ref<Organism[]>;
  loading: Ref<boolean>;
  error: Ref<Error | null>;
}

const useGetOrganisms = (): UseGetOrganism => {
  const config = inject<EnvironmentConfig>(ConfigKey);

  const organisms: Ref<Organism[]> = ref([]);
  const error: Ref<null | Error> = ref(null);
  const loading: Ref<boolean> = ref(true);

  fetch(`${config!.BACKEND_URL}/organisms`)
    .then((response) => response.json())
    .then((newDiseases: Organism[]) => {
      organisms.value = newDiseases;
    })
    .catch((err) => {
      error.value = err;
    })
    .finally(() => {
      loading.value = false;
    })

  return {
    organisms,
    loading,
    error,
  };
};

export default useGetOrganisms;
