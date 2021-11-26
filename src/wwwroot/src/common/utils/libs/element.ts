// 按需加载element
import type { App } from 'vue';

// import {
//   ElAlert,
//   ElAside,
//   ElAutocomplete,
//   ElAvatar,
//   ElBacktop,
//   ElBadge,
//   ElBreadcrumb,
//   ElBreadcrumbItem,
//   ElButton,
//   ElButtonGroup,
//   ElCalendar,
//   ElCard,
//   ElCarousel,
//   ElCarouselItem,
//   ElCascader,
//   ElCascaderPanel,
//   ElCheckbox,
//   ElCheckboxButton,
//   ElCheckboxGroup,
//   ElCol,
//   ElCollapse,
//   ElCollapseItem,
//   ElCollapseTransition,
//   ElColorPicker,
//   ElContainer,
//   ElDatePicker,
//   ElDialog,
//   ElDivider,
//   ElDrawer,
//   ElDropdown,
//   ElDropdownItem,
//   ElDropdownMenu,
//   ElFooter,
//   ElForm,
//   ElFormItem,
//   ElHeader,
//   ElIcon,
//   ElImage,
//   ElInput,
//   ElInputNumber,
//   ElLink,
//   ElMain,
//   ElMenu,
//   ElMenuItem,
//   ElMenuItemGroup,
//   ElOption,
//   ElOptionGroup,
//   ElPageHeader,
//   ElPagination,
//   ElPopconfirm,
//   ElPopover,
//   ElPopper,
//   ElProgress,
//   ElRadio,
//   ElRadioButton,
//   ElRadioGroup,
//   ElRate,
//   ElRow,
//   ElScrollbar,
//   ElSelect,
//   ElSlider,
//   ElStep,
//   ElSteps,
//   ElSubMenu,
//   ElSwitch,
//   ElTabPane,
//   ElTable,
//   ElTableColumn,
//   ElTabs,
//   ElTag,
//   ElTimePicker,
//   ElTimeSelect,
//   ElTimeline,
//   ElTimelineItem,
//   ElTooltip,
//   ElTransfer,
//   ElTree,
//   ElUpload,
//   ElInfiniteScroll,
//   ElLoading,
//   ElMessage,
//   ElMessageBox,
//   ElNotification
// } from 'element-plus'

// import locale from 'element-plus/lib/locale'
// import lang from 'element-plus/lib/locale/lang/zh-cn'

// const components = [
//   ElAlert,
//   ElAside,
//   ElAutocomplete,
//   ElAvatar,
//   ElBacktop,
//   ElBadge,
//   ElBreadcrumb,
//   ElBreadcrumbItem,
//   ElButton,
//   ElButtonGroup,
//   ElCalendar,
//   ElCard,
//   ElCarousel,
//   ElCarouselItem,
//   ElCascader,
//   ElCascaderPanel,
//   ElCheckbox,
//   ElCheckboxButton,
//   ElCheckboxGroup,
//   ElCol,
//   ElCollapse,
//   ElCollapseItem,
//   ElCollapseTransition,
//   ElColorPicker,
//   ElContainer,
//   ElDatePicker,
//   ElDialog,
//   ElDivider,
//   ElDrawer,
//   ElDropdown,
//   ElDropdownItem,
//   ElDropdownMenu,
//   ElFooter,
//   ElForm,
//   ElFormItem,
//   ElHeader,
//   ElIcon,
//   ElImage,
//   ElInput,
//   ElInputNumber,
//   ElLink,
//   ElMain,
//   ElMenu,
//   ElMenuItem,
//   ElMenuItemGroup,
//   ElOption,
//   ElOptionGroup,
//   ElPageHeader,
//   ElPagination,
//   ElPopconfirm,
//   ElPopover,
//   ElPopper,
//   ElProgress,
//   ElRadio,
//   ElRadioButton,
//   ElRadioGroup,
//   ElRate,
//   ElRow,
//   ElScrollbar,
//   ElSelect,
//   ElSlider,
//   ElStep,
//   ElSteps,
//   ElSubMenu,
//   ElSwitch,
//   ElTabPane,
//   ElTable,
//   ElTableColumn,
//   ElTabs,
//   ElTag,
//   ElTimePicker,
//   ElTimeSelect,
//   ElTimeline,
//   ElTimelineItem,
//   ElTooltip,
//   ElTransfer,
//   ElTree,
//   ElUpload
// ]

// const plugins = [
//   ElInfiniteScroll,
//   ElLoading,
//   ElMessage,
//   ElMessageBox,
//   ElNotification
// ]

import ElementPlus from 'element-plus';
// main.js
// 统一导入el-icon图标
import * as ElIconModules from '@element-plus/icons';

// utils/utils.js
// 将el-icon的组件名称AbbbCddd转化为i-abbb-cddd形式
// 此前用switch做组件名时因关键字重复报错，所以格式统一加了前缀
// 例：Switch转换为i-switch，ArrowDownBold转换为i-arrow-down-bold
export function transElIconName(iconName: string) {
  return 'i' + iconName.replace(/[A-Z]/g, (match) => '-' + match.toLowerCase());
}

export function setupElementPlus(app: App<Element>): void {
  // 设置语言
  // locale.use(lang)
  // components.forEach((component: any) => {
  //   app.component(component.name, component)
  // })

  // Icons.forEach((plugin: any) => {
  //   app.use(plugin);
  // });

  // 统一注册el-icon图标
  for (const iconName in ElIconModules) {
    app.component(ElIconModules[iconName].name, ElIconModules[iconName].render());
  }

  app.use(ElementPlus);
  // app.use(Icons.Location);
  // 全局配置
  app.config.globalProperties.$ELEMENT = { size: 'small', zIndex: 3000 };
}
