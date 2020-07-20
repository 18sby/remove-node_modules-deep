/*
  递归删除所有的 node_moduels 文件夹
*/

const shell = require('shelljs'); // 在 node 中运行 windows/linux/mac 命令
const path = require('path');
const fs = require('fs');

const moduleReg = /node_modules/; // 正则匹配所有 node 依赖文件夹
let count = 0; // 统计删除的 node_modules 文件夹数量
const deleteDirs = []; // 删除的目录路径
const DEFAULT_FILEPATH = process.cwd(); // 当前工作目录
// console.log( '当前工作目录', defaultFilepath );

/**
 * todo 递归删除当前目录内部的所有 node_modules 文件夹
 * @param { string } filepath 绝对路径，默认为当前工作目录
 */
function removeModules(filepath = DEFAULT_FILEPATH) {
  try {
    let statObj = fs.statSync(filepath);
    if (statObj.isDirectory()) { // 是文件
      if (moduleReg.test(filepath)) {
        deleteDirs.push(filepath);
        count++;
        shell.rm('-rf', filepath);
        return ;
      }
      let dirs = fs.readdirSync(filepath);
      dirs.forEach(dir => {
        removeModules(path.join(filepath, dir));
      });
    }
  } catch (err) {
    throw new Error('文件路径无效: ', err);
  }
}

removeModules(path.resolve(__dirname, '../../sby'));
console.log('已删除 node_modules 文件夹 ' + count + ' 个');
console.log('删除的目录有：', deleteDirs);