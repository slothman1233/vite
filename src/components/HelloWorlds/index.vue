<template>
  <h1>{{ msg }}</h1>
  124213423423423432
</template>

<script lang="ts">
  import { App } from 'store/mutation-types';
  import { getrandom } from 'services/randomDataService/randomData';
  import { useStore } from 'store/index';
  import { ref, defineComponent, computed, onMounted } from 'vue';
  // defineProps<{ msg: string }>();
  export default defineComponent({
    name: 'HelloWorlds',
    props: {
      msg: {
        type: String,
        default: '默认22msgs',
        require: true,
      },
    },
    setup: () => {
      const counts = ref(0);

      const store = useStore();

      // let a = await getrandom()
      // console.log(a)

      onMounted(async () => {
        let a = await getrandom();
        // console.log(a);
      });

      const count: any = computed({
        get() {
          return store.state.app.count;
        },
        set(value) {
          store.dispatch(App.action.CHANGECOUNT, value);
        },
      });
      return { count };
    },
  });
</script>

<style scoped>
  a {
    color: #42b983;
  }

  label {
    margin: 0 0.5em;
    font-weight: bold;
  }

  code {
    background-color: #eee;
    padding: 2px 4px;
    border-radius: 4px;
    color: #304455;
  }
</style>

function getrandom() { throw new Error("Function not implemented."); }
