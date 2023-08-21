export function fileRemove(path){
    const fs = require('fs');
    
    fs.unlink(path, (err) => {
        if (err) 
            console.error('Błąd podczas usuwania pliku:', err);
        else 
            console.log('Plik został usunięty.');
    });
}

export function fileCreate(path){
    const fs = require('fs');

    fs.writeFile(path, fileContent, (err) => {
    if (err) 
        console.error('Błąd podczas tworzenia pliku:', err);
    else 
        console.log('Plik został utworzony.');
    });
}

export function fileListOfFiles(path){
    const fs = window.require('fs');
    
    let tab = [];
    if (! fs.existsSync(path)) {
        return [-1]
    }
    return fs.readdirSync(path, (err, files) => {
        if(err){
            return [-1];
        }
        files.map(file => {
            if(fileIsDirectory(file.toString));
                tab.push(file.toString());
        });
        // console.log(tab);
        return tab;
    });
}

export function fileIsDirectory(path){
    const fs = window.require('fs');

    fs.stat(path, (err, stats) => {
    if (err) {
        console.error(err);
        return;
    }
    if (! stats.isDirectory())
        return true;
    else
        return false;
    });
}