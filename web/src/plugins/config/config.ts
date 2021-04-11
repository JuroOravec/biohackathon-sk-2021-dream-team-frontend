type EnvironmentConfig = Readonly<{
  BACKEND_URL: string;
  AUTH_CALLBACK_URL: string;
  GRAPHQL_URL: string;
  LOGIN_URL: string;
}>;

type ApplicationConfig = Readonly<{
  development: EnvironmentConfig;
  production: EnvironmentConfig;
}>;

const createConfig = (): ApplicationConfig => ({
  development: {
    AUTH_CALLBACK_URL: '',
    BACKEND_URL: 'https://limitless-basin-28541.herokuapp.com/api/v1',
    GRAPHQL_URL: '',
    LOGIN_URL: '',
  },
  production: {
    AUTH_CALLBACK_URL: '',
    BACKEND_URL: 'https://limitless-basin-28541.herokuapp.com/api/v1',
    GRAPHQL_URL: '',
    LOGIN_URL: '',
  },
});

export default createConfig;
export type { EnvironmentConfig, ApplicationConfig };
