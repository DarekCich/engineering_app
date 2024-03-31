import React from 'react'
import styles from './fileList.module.css'
import MenuButton from '../../buttons/menuButton';
import { useState, useEffect } from 'react';
import { fileListOfFiles, fileCreate,fileRename } from '../../../../main/backend/fileMenager';
import File from './file/file';
function FileList({pathClicked, addToPages}){
    const [fileList,       setfileList] = useState([]);
    const [fileClicked, setFileClicked] = useState('');
    const [reload, setReload] = useState(false);
    const newFile = async () => {
        let tmp = pathClicked+'/newFile';
        await fileCreate(tmp)
        tmp = fileListOfFiles(pathClicked)
            if (   tmp[0] === -1 
                || tmp[0] === -2 ){
                return
            }
            setfileList(tmp)
    }
    const changeReload = () =>{
        setReload(!reload)
    }
    const click = () => {

      
    }
    useEffect(() => {
        if (typeof window !== "undefined") {
            const tmp = fileListOfFiles(pathClicked)
            if (   tmp[0] === -1 
                || tmp[0] === -2 ){
                return
            }
            setfileList(tmp)
            setFileClicked('')
        }
    }, [pathClicked]);   
    useEffect(() => {
        if (typeof window !== "undefined") {
            const tmp = fileListOfFiles(pathClicked)
            if (   tmp[0] === -1 
                || tmp[0] === -2 ){
                return
            }
            setfileList(tmp)
            setFileClicked('')
        }
    }, [reload]); 
    return(
        <div className={styles.fileList}>
            <div className={styles.fileBar}>
                <div className={styles.folderName}>{ pathClicked === "./files" ? "Pliki Lokalne" : pathClicked.split("/").pop()}</div>
                <div className={styles.fileButtons}>
                    <MenuButton url='/images/reload.png'  onClick={click}></MenuButton>
                    <MenuButton url='/images/addFile.png' onClick={newFile}></MenuButton>
                </div>
            </div>
            <div className={styles.files}>
                {   fileList.map((x, index) => (
                    <File path={x} key={index} pathClicked={pathClicked} setReload={changeReload} fileClicked={fileClicked} setFileClicked={setFileClicked} addToPages={addToPages}></File>
                    )) 
                }
            </div>
        </div>
    )
}

export default FileList;