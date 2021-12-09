import { App, ssrContextKey } from 'vue';
import { createApp as _createApp } from './main';
import { renderToString } from '@vue/server-renderer';
import { RouteLocationRaw } from 'vue-router';

export function createApp() {
  return _createApp(true);
}

export async function render(app: App, url: RouteLocationRaw, manifest: any) {
  // 在渲染之前将路由器设置为所需的URL
  await app.config.globalProperties.$router.push(url);
  await app.config.globalProperties.$router.isReady();

  //通过useSSRContext()传递SSR上下文对象
  // @vitejs/plugin-vue将代码注入到注册组件的setup()中
  //在ctx.modules上。渲染后，ctx。模块将包含所有
  //在渲染调用期间实例化的组件。
  const ctx: any = {};
  const html = await renderToString(app, ctx);

  // 清除 ssrContext provide，防止在使用对象池时，警告 provide 已存在
  // @ts-ignore
  if (app._context.provides[ssrContextKey]) {
    // @ts-ignore
    delete app._context.provides[ssrContextKey];
  }

  //myMeta生成头部信息
  const _myMeta = await getMeta(url, app);

  // Vite生成的SSR清单包含模块->块/资产映射
  //然后我们可以使用它来确定需要预加载哪些文件请求。

  const preloadLinks = renderPreloadLinks(ctx.modules, manifest);
  return [html, preloadLinks, _myMeta];
}

export async function getMeta(url: RouteLocationRaw, app?: App) {
  let apps = app;
  if (!app) {
    apps = createApp();
    await apps.config.globalProperties.$router.push(url);
    await apps.config.globalProperties.$router.isReady();

    //通过useSSRContext()传递SSR上下文对象
    // @vitejs/plugin-vue将代码注入到注册组件的setup()中
    //在ctx.modules上。渲染后，ctx。模块将包含所有
    //在渲染调用期间实例化的组件。
    const ctx: any = {};
    await renderToString(apps, ctx);

    // 清除 ssrContext provide，防止在使用对象池时，警告 provide 已存在
    // @ts-ignore
    if (apps._context.provides[ssrContextKey]) {
      // @ts-ignore
      delete apps._context.provides[ssrContextKey];
    }
  }

  //myMeta生成头部信息
  return apps.config.globalProperties.$myMeta.renderToString();
}

//判端路由是否存在
export async function hasRoute(url: string, app?: App) {
  let apps = app;

  if (!app) {
    apps = createApp();
  }

  const pathAry: string[] = [];

  apps.config.globalProperties.$router.getRoutes().forEach((item: any) => {
    pathAry.push(item.path);
  });

  return pathAry.indexOf(url) >= 0;
}

function renderPreloadLinks(modules: any[], manifest: commonObject<any>) {
  let links = '';
  const seen = new Set();
  modules.forEach((id) => {
    const files = manifest[id];
    if (files) {
      files.forEach((file: string) => {
        if (!seen.has(file)) {
          seen.add(file);
          links += renderPreloadLink(file);
        }
      });
    }
  });
  return links;
}

function renderPreloadLink(file: string) {
  if (file.endsWith('.js')) {
    return `<link rel="modulepreload" crossorigin href="${file}">`;
  } else if (file.endsWith('.css')) {
    return `<link rel="stylesheet" href="${file}">`;
  } else if (file.endsWith('.woff')) {
    return ` <link rel="preload" href="${file}" as="font" type="font/woff" crossorigin>`;
  } else if (file.endsWith('.woff2')) {
    return ` <link rel="preload" href="${file}" as="font" type="font/woff2" crossorigin>`;
  } else if (file.endsWith('.gif')) {
    return ` <link rel="preload" href="${file}" as="image" type="image/gif">`;
  } else if (file.endsWith('.jpg') || file.endsWith('.jpeg')) {
    return ` <link rel="preload" href="${file}" as="image" type="image/jpeg">`;
  } else if (file.endsWith('.png')) {
    return ` <link rel="preload" href="${file}" as="image" type="image/png">`;
  } else {
    // TODO
    return '';
  }
}
