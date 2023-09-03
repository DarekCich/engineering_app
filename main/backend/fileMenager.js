export function fileRemove(path){
    const fs = require('fs');
    
    fs.unlink(path, (err) => {
        if (err) 
            console.error('Błąd podczas usuwania pliku:', err);
        else 
            console.log('Plik został usunięty.');
    });
}
export async function fileCreate(name, num) {
    const fs = window.require('fs');

    if (typeof num === 'undefined') {
        num = 1;
    }

    const fileName = num > 1 ? `${name}(${num})` : name;

    try {
        await fs.promises.access(fileName);
        // Plik istnieje, wywołujemy rekurencyjnie
        await fileCreate(name, num + 1);
    } catch (error) {
        // Plik nie istnieje, tworzymy nowy
        await fs.promises.writeFile(fileName, '');
    }
}

export function fileRename(pathD,old,newname){
    const fs = require('fs');
    const path = require('path');
    console.log(pathD+ '/'  + old);
    const oldFile  = path.join(pathD+ '/'  + old);
    const newFileDirectoryName = pathD + '/' + newname
    fs.rename(oldFile, newFileDirectoryName, (err) => {
        if (err) {
            return ''
        }
    return newFileDirectoryName
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