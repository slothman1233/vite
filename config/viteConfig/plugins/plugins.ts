import vue from '@vitejs/plugin-vue'
//一个自动导入组件库样式的vite插件。
import vueJsx from '@vitejs/plugin-vue-jsx'
import { configMockPlugin } from './configMockPlugin'
import { configStyleImportPlugin } from './configStyleImportPlugin'
export default (isBuild: boolean, mode: string, usermock: boolean) => {

    return [
        vue(),
        vueJsx(),
        //注入mock
        configMockPlugin(usermock, isBuild, mode)
        // configStyleImportPlugin(isBuild)
    ]
}