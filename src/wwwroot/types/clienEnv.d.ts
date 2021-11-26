declare interface clientEnv {
  NODE_ENV: string;
  VUE_APP_SSO_MODE: 'dev' | 'test' | 'pre' | 'prod';
  VUE_APP_PROJECT_ID: string;
}
