<template>
  <h1>{{ msg }}</h1>

  <div>
    {{ count }}
  </div>

  <HelloWorlds :msg="`sdfsdf`"></HelloWorlds>

  <el-row>
    <el-button>Default</el-button>
    <el-button type="primary">Prima11ry</el-button>
    <el-button type="success">Su151ccess</el-button>
    <el-button type="info">Inf45o</el-button>
    <el-button type="warning">War3ning</el-button>
    <el-button type="danger">Danger</el-button>
    <el-button>中文1</el-button>
  </el-row>

  <van-button type="default">默认按钮</van-button>
  <van-button type="primary">主要按钮</van-button>
  <van-button type="info">信息按钮</van-button>
  <van-button type="warning">警告按钮</van-button>
  <van-button type="danger">危险按钮</van-button>
  <button type="button" @click="count++">count is: {{ count }}</button>
  <!-- <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p> -->
</template>

<script lang="ts">
  import mutationTypes from 'store/mutation-types';
  import { getrandom } from 'services/randomDataService/randomData';
  import { useStore } from 'store/index';
  import { ref, defineComponent, computed, onMounted } from 'vue';
  // defineProps<{ msg: string }>();
  export default defineComponent({
    name: 'HelloWorld',
    props: {
      msg: {
        type: String,
        default: '默认msgs',
        require: true,
      },
    },
    setup: (prop) => {
      // console.log(prop.msg)
      const counts = ref(0);

      const store = useStore();

      // let a = await getrandom()
      // console.log(a)

      onMounted(async () => {
        // let a = await getrandom();
        // console.log(a);
      });

      const count: any = computed({
        get() {
          return store.state.app.count;
        },
        set(value) {
          store.dispatch(mutationTypes.action.CHANGECOUNT, value);
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
