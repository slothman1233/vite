import fs, { MoveOptions, WriteFileOptions, WriteOptions } from 'fs-extra';

/**
 * 是否是文件
 * @param {string} filepath 文件地址
 */
export const isFile = async (filepath: string) => {
  return (await fs.stat(filepath)).isFile();
};

/**
 * 是否是文件夹
 * @param {string} dirpath 文件夹地址
 */
export const isDir = async (dirpath: string) => {
  return (await fs.stat(dirpath)).isDirectory();
};

/**
 * 文件是否存在
 * @param {string} filepath 文件地址
 */
export const ExistsFile = (filepath: string) => fs.pathExists(filepath);

/**
 * 创建文件目录
 * @param {string} filepath 文件夹名称
 */
export const createDir = (filepath: string) => {
  return fs.ensureDir(filepath);
};

/**
 * 创建文件
 * @param {string} filepath 文件地址
 */
export const EnsureFile = async (filepath: string) => {
  const isExists = await ExistsFile(filepath);
  if (!isExists) {
    return await fs.ensureFile(filepath);
  }
};

/**
 * 复制文件
 * @param {string} src 替换的文件地址
 * @param {string} dest 新的文件地址
 * @param {CopyOptions} options
 */
export const copyFile = (src: string, dest: string, options?: fs.CopyOptions) => {
  if (options) {
    return fs.copy(src, dest, options);
  }
  return fs.copy(src, dest);
};

/**
 * 清空目录
 * @param {string} dirpath 目录地址
 */
export const emptyDir = (dirpath: string) => fs.emptyDir(dirpath);

/**
 * 读取文件
 * @param {string} filepath 文件地址
 */
export const readFile = async (filepath: string) => {
  const isExists = await ExistsFile(filepath);
  if (!isExists) {
    return Promise.reject('文件不存在');
  }
  return fs.readFile(filepath);
};

/**
 * 删除文件夹
 * @param {string} dirpath 文件夹地址
 */
export const removeDir = async (dirpath: string) => {
  const isdir = await isDir(dirpath);
  if (!isdir) {
    return Promise.reject('文件夹不存在');
  }
  return fs.remove(dirpath);
};

/**
 * 删除文件
 * @param {string} filepath 文件地址
 */
export const removeFile = async (filepath: string) => {
  const isExists = await ExistsFile(filepath);
  if (!isExists) {
    return Promise.reject('文件不存在');
  }
  return fs.remove(filepath);
};

/**
 * 读取JSON文件，将其解析为对象
 * @param {string} filepath 文件地址
 */
export const readJson = async (filepath: string) => {
  const isExists = await ExistsFile(filepath);
  if (!isExists) {
    return Promise.reject('文件不存在');
  }
  return fs.readJSON(filepath);
};

/**
 * 写json文件
 * @param {string} file 文件地址
 * @param {any} object 写入内容
 * @param {WriteOptions} options 写入参数
 */
export const writeJson = async (file: string, object: any, options?: WriteOptions) => {
  const isExists = await ExistsFile(file);
  if (!isExists) {
    EnsureFile(file);
  }
  if (options) {
    return fs.outputJson(file, object, options);
  }
  return fs.outputJson(file, object);
};

/**
 * 写入文件
 * @param {string} filepath 文件地址
 * @param {string} str 写入内容
 * @param {WriteFileOptions | string} options 写入参数
 */
export const writeFile = async (
  filepath: string,
  str: string,
  options?: WriteFileOptions | string,
) => {
  if (options) {
    return fs.outputFile(filepath, str, options);
  }
  return fs.outputFile(filepath, str);
};

/**
 * 移动文件或文件夹
 * @param {string} src 源文件地址
 * @param {string} dest 移动后的地址
 * @param {MoveOptions} options
 */
export const moveFile = (src: string, dest: string, options?: MoveOptions) => {
  if (options) {
    return fs.move(src, dest, options);
  }
  return fs.move(src, dest);
};
