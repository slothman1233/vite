/**
 *  使用 gzip 或者 brotli 来压缩资源
 *  参数说明
 * @param {boolean} verbose 是否在控制台输出压缩结果   默认 true
 * @param {RegExp || (file: string) => boolean} filter 指定哪些资源不压缩   默认 DefaultFilter
 * @param {boolean} disable 是否禁用   默认 false
 * @param {number} threshold 体积大于 threshold 才会被压缩,单位 b  默认 -
 * @param {string} algorithm 压缩算法,可选 [ 'gzip' , 'brotliCompress' ,'deflate' , 'deflateRaw']   默认 gzip
 * @param {string} ext 生成的压缩包后缀   默认 .gz
 * @param {object} compressionOptions 对应的压缩算法的参数   默认 -
 * @param {boolean} deleteOriginFile 压缩后是否删除源文件   默认 -
 */
import type { Plugin } from 'vite';

import compressPlugin from 'vite-plugin-compression';

export default function configCompressPlugin(
  compress: 'gzip' | 'brotli' | 'none',
  deleteOriginFile = false,
): Plugin | Plugin[] {
  const compressList = compress.split(',');

  const plugins: Plugin[] = [];

  if (compressList.includes('gzip')) {
    plugins.push(
      compressPlugin({
        ext: '.gz',
        deleteOriginFile,
      }),
    );
  }
  if (compressList.includes('brotli')) {
    plugins.push(
      compressPlugin({
        ext: '.br',
        algorithm: 'brotliCompress',
        deleteOriginFile,
      }),
    );
  }
  return plugins;
}
