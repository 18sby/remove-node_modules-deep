## Description
递归删除指定目录以及它里面的所有 node_modules 文件夹

## Warning
操作不可撤销，删除的文件夹不会出现在垃圾篓中

## Usage
`rm-modules --path {relativePath}`
- relativePath 传入相对于当前目录的相对路径，可以不传，默认为当前的工作目录