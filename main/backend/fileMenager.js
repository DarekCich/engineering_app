import { log } from 'console';

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

export function fileListOfFiles(path) {
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

            if (!stats.isDirectory()) {
                tab.push(file);
            }
        });

        return tab;
    } catch (err) {
        console.error(err);
        return [-2];
    }
}

function fileIsDirectory(path){
    const fs = window.require('fs');
    console.log('test');
    fs.lstat(path, (err, stats) => {
    if (err) {
        console.error(err);
        return false;
    }
    
    if (stats.isDirectory())
        return true;
    else
        return false;
    });
}