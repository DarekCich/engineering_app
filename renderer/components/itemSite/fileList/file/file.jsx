import styles from './file.module.css'
import Icon from '../../../folderSite/icon/icon';
import { fileRename } from '../../../../../main/backend/fileMenager';
import React, { useState, useEffect } from 'react';
function File({path, pathClicked, setReload, setFileClicked, fileClicked}){
    const [rename,              setRename] = useState(false);
    const [newName,            setNewName] = useState(path.split('/').pop())
    const changeValue = (val)=>{
        const value = val.target.value
        if (value.length <15){
            setNewName(value)
        }
    }
    const handleKeyDown = (event) => {
        if (   event.key    === 'Enter' 
            && rename) {
                if(newName !== '')
                    fileRename(pathClicked,path,newName)
                else
                    setNewName(path)
                setRename(false)
                setReload();
        }
    };
    useEffect(() =>  {
        if(fileClicked!==path && rename ){
            if(newName !== '')
                fileRename(pathClicked,path,newName)
            else
                setNewName(path)
            setRename(false)
            setReload();
        }

    }, [fileClicked]); 
    return(
        <div className={styles.file} onClick={()=>{
            setFileClicked(path)
        }}>
            <div className={fileClicked===path ? styles.isClicked : styles.isntClicked}>
                <Icon name={ path}/>
                <div className={styles.name} onDoubleClick={()=>{setRename(true)}}>
                {
                    rename ?   
                        <input type='text' value={newName} 
                        onChange={(val)=>{changeValue(val)}} 
                        onKeyDown={handleKeyDown} className={styles.inputName}></input>
                    :
                        path 
                }
                </div>
            </div>
        </div>
   
    )
}

export default File;