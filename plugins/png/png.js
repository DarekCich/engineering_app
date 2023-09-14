export async function importPng(path) {
  let tmp =process.cwd()+path;
  tmp = tmp.replace(/\\/g,'/')
  tmp = tmp.replace('\.','')
  console.log(tmp);
  return tmp;
}




// const fs = require('fs');