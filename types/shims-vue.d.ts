declare module '*.vue' {
  import { defineComponent, DefineComponent } from 'vue';
  const Component: ReturnType<typeof defineComponent>;

  const component: DefineComponent<{}, {}, any>;

  declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
      $configModel: clientEnv; // configModel
      $ELEMENT: object;
      $myMeta: any;
    }
  }

  export default Component;
}
