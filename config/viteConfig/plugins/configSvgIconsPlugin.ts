/**
 *  svg 处理
 */
import type { Plugin } from 'vite';
import SvgIconsPlugin from 'vite-plugin-svg-icons';
import path from 'path';

export default function configSvgIconsPlugin(isBuild: boolean): Plugin {
  const svgIconsPlugin: Plugin = SvgIconsPlugin({
    iconDirs: [path.resolve(process.cwd(), 'public/assets/icons/svg')],
    svgoOptions: isBuild,
    // 指定symbolId格式
    symbolId: 'icon-[dir]-[name]',
  });
  return svgIconsPlugin;
}
