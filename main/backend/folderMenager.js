export function createRootFolder(){
    const fs = window.require('fs');
    if (! fs.existsSync("./files")) {
        console.log("git")
        mkdir("./files")
    }
}


export function listItemInFolder(folderName){
    let tab = [];
    const fs = window.require('fs');
    if (! fs.existsSync(folderName)) {
        console.log("git")
        mkdir(folderName)
        return [folderName]
    }
    return fs.readdirSync(folderName, (err, files) => {
        if(err){
            mkdir(files);
            return ['nic'];
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
const mkdir = (name) =>{
    console.log("git")
    const path = window.require('path');
    const fs = window.require('fs');
    fs.mkdir(name, (err) => {
        if (err) {
            return console.error(err);
        }
        console.log('Directory created successfully!');
    });
}