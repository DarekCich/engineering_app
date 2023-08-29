export function folderCreateRoot(){
    const fs = window.require('fs');
    if (! fs.existsSync("./files")) {
        // console.log("git")
        mkdir("./files")
    }
}
export function folderCreate(path){
    mkdir(path)
}


export function folderListOfFolders(path) {
    const fs = window.require('fs');
    let tab = [];

    if (!fs.existsSync(path)) {
        return [-1];
    }
    try {
        const files = fs.readdirSync(path);
        files.forEach(file => {
            const fullPath = `${path}/${file}`;
            const stats = fs.lstatSync(fullPath);
            if (stats.isDirectory()) {
                tab.push(file);
            }
        });
        return tab;
    } catch (err) {
        console.error(err);
        return [-2];
    }
}

async function mkdir(name, num){
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
export function folderRename(old,newname){
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
export function folderRemove(path){
    const fs = require('fs');

    fs.rm(path, { recursive: true }, (err) => {
        if (err) 
            console.error('Błąd podczas usuwania katalogu:', err);
        // else 
            // console.log('Katalog został usunięty.');
    });
}
