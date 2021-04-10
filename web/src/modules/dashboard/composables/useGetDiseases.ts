import { inject, Ref, ref } from '@vue/composition-api';

import { ConfigKey } from '@/plugins/config';
import type { EnvironmentConfig } from '@/plugins/config/config';

export interface Disease {
  id: number;
  name: string;
  hits: number;
}

interface UseGetDiseases {
  diseases: Ref<Disease[]>;
  loading: Ref<boolean>;
  error: Ref<Error | null>;
}

const useGetDiseases = (): UseGetDiseases => {
  const config = inject<EnvironmentConfig>(ConfigKey);

  const diseases: Ref<Disease[]> = ref([]);
  const error: Ref<null | Error> = ref(null);
  const loading: Ref<boolean> = ref(true);

  fetch(`${config!.BACKEND_URL}/diseases`)
    .then((response) => response.json())
    .then((newDiseases: Disease[]) => {
      diseases.value = newDiseases;
    })
    .catch((err) => {
      error.value = err;
    })
    .finally(() => {
      loading.value = false;
    })

  return {
    diseases,
    loading,
    error,
  };
};

export default useGetDiseases;
