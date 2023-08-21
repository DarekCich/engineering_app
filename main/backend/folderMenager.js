export function createRootFolder(){
    const fs = window.require('fs');
    if (! fs.existsSync("./files")) {
        console.log("git")
        mkdir("./files")
    }
}
export function createFolder(path){
    const fs = window.require('fs');
    mkdir(path)
}


export function listItemInFolder(folderName){
    let tab = [];
    const fs = window.require('fs');
    if (! fs.existsSync(folderName)) {
        return [-1]
    }
    return fs.readdirSync(folderName, (err, files) => {
        if(err){
            return [-1];
        }
        files.map(file => {
            if(isDirectory(file.toString));
                tab.push(file.toString());
        });
        console.log(tab);
        return tab;
    });
}


export function isDirectory(path){
    const fs = window.require('fs');
    fs.stat(path, (err, stats) => {
    if (err) {
        console.error(err);
        return;
    }
    if (stats.isDirectory())
        return true;
    else
        return false;
    });
}
const mkdir = async (name, num) =>{
    const path = window.require('path');
    const fs = window.require('fs');
    if(typeof num === 'number')
        await fs.mkdir(name+`(${num})`, (err) => {
            if (err) {
                mkdir(name,num+1)  
            }
        });
    else
        await fs.mkdir(name, (err) => {
            if (err) 
                mkdir(name,1)
        });
}
export function renameFolder(old,newname){
    const fs = require('fs');
    const path = require('path');
    const parentDirectory  = path.join(old, '..');
    const newDirectoryName = parentDirectory + '\\' + newname
    fs.rename(old, newDirectoryName, (err) => {
        if (err) {
            return ''
        }
    return newDirectoryName
    });
}
