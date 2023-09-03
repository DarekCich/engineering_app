import styles from './file.module.css'
import Icon from '../../../folderSite/icon/icon';
import { fileRename, fileRemove } from '../../../../../main/backend/fileMenager';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
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
    
    const deleteFile = () => {
        fileRemove(pathClicked+'/'+path)
        setReload();
    }
    
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
        <div className={styles.file} 
            onClick={()=>{setFileClicked(path)}}
            onDoubleClick={()=>{loadFile()}}
        >
            <div className={fileClicked===path ? styles.isClicked : styles.isntClicked}>
                {
                    fileClicked===path ?               
                    <div className={styles.imgAndButton}>
                        <button className={styles.buttonDel} onClick={deleteFile}>
                            <img src="/images/delete.png" alt="delete" className={styles.buttonDelImg}/>
                        </button> 
                        <Icon name={ path}/>
                        <Link href={`/editor/edit?parametr=${pathClicked}/${path}`} className={"NewFile"}> test </Link>
                    </div>
                    :
                    <Icon name={ path}/>
                }
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