import type { VueConstructor } from 'vue';
import * as Sentry from '@sentry/vue';
import { Integrations } from '@sentry/tracing';

const installSentry = (vueClass: VueConstructor): void => {
  Sentry.init({
    Vue: vueClass,
    dsn: 'https://aa560a082dac45fcbcb92b5f08d5738f@o470159.ingest.sentry.io/5713950',
    integrations: [new Integrations.BrowserTracing()],
    logErrors: true,
    tracesSampleRate: 0.7,
  });
};

export default installSentry;
