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


export function folderListOfFolders(folderName){
    const fs = window.require('fs');
    
    let tab = [];
    if (! fs.existsSync(folderName)) {
        return [-1]
    }
    return fs.readdirSync(folderName, (err, files) => {
        if(err){
            return [-1];
        }
        files.map(file => {
            if(folderIsDirectory(file.toString));
                tab.push(file.toString());
        });
        // console.log(tab);
        return tab;
    });
}

export function folderIsDirectory(path){
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

    fs.rmdir(path, { recursive: true }, (err) => {
        if (err) 
            console.error('Błąd podczas usuwania katalogu:', err);
        // else 
            // console.log('Katalog został usunięty.');
    });
}
