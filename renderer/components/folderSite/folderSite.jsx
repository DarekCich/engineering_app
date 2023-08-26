import styles from './folderSite.module.css';
import MenuButton from '../buttons/menuButton';
import Folders from './folders/folderList';
import React, { useEffect, useRef, useState } from 'react';
import { folderCreate } from '../../../main/backend/folderMenager';
function FolderSite({pathClicked, setPathClicked}) {
  
  const [ reload, setReload] = useState(false)
  const click = () =>{
    setReload(!reload)
  }
  const newFolder = async ()=>{
    let tmp = pathClicked+'/newFolder';
    await folderCreate(tmp)
    setReload(!reload);
  }
  function reloadEvrySecond() {
    setInterval(() => {
      setReload(!reload);
    }, 1000); 
  }
  
  // Wywołanie funkcji
  reloadEvrySecond();
  return (
    <div className={styles.folderSite}>
      <div className={styles.folderBar}>
        <div className={styles.folderName}>Lista Folderów</div>
        <div className={styles.folderButtons}>
          <MenuButton url='/images/reload.png' onClick={click}></MenuButton>
          <MenuButton url='/images/createFolder.png' onClick={newFolder}></MenuButton>
        </div>
      </div>
      <div className={styles.folders}>
          <Folders path='./files' pathClicked={pathClicked} setPathClicked={setPathClicked} reload={reload}></Folders>
        </div>
    </div>
  );
}

export default FolderSite;
