import styles from './fileList.module.css'
import MenuButton from '../../buttons/menuButton';
import { useState, useEffect } from 'react';
import { fileListOfFiles } from '../../../../main/backend/fileMenager';
import File from './file/file';
function FileList({pathClicked}){
    const [fileList,       setfileList] = useState([]);
    const [fileClicked, setFileClicked] = useState('')
    const fileCraete = () => {
        
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
        }
    }, [pathClicked]);   

    return(
        <div className={styles.fileList}>
            <div className={styles.fileBar}>
                <div className={styles.folderName}>{pathClicked.split('/').pop()}</div>
                <div className={styles.fileButtons}>
                    <MenuButton url='/images/reload.png' onClick={click}></MenuButton>
                    <MenuButton url='/images/addFile.png' onClick={fileCraete}></MenuButton>
                </div>
            </div>
            <div className={styles.files}>
                {   fileList.map((x, index) => (
                    <File path={x} key={index}></File>
                    )) 
                }
            </div>
        </div>
    )
}

export default FileList;