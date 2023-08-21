import styles from './fileList.module.css'
import MenuButton from '../../buttons/menuButton';
import { useState } from 'react';
function FileList({pathClicked}){
    const [fileList,       setfileList] = useState([]);
    const [fileClicked, setFileClicked] = useState('')
    const fileCraete = () => {
        
    }
    const click = () => {
        
    }
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
                        <li key={index} className={styles.folderLi}>
                            {x}
                        </li>
                    )) 
                }
            </div>
        </div>
    )
}

export default FileList;