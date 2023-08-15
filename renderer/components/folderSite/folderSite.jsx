import styles from './folderSite.module.css';
import MenuButton from '../buttons/menuButton';
import Folders from './folders/folderList';
import React, { useEffect, useRef, useState } from 'react';
function FolderSite() {
  const [ pathClicked, setPathClicked ] = useState('');
  return (
    <div className={styles.folderSite}>
      <div className={styles.folderBar}>
        <div className={styles.folderName}>Lista Folderów</div>
        <div className={styles.folderButtons}>
          <MenuButton url='/images/reload.png' onClick={(x) => { return null; }}></MenuButton>
          <MenuButton url='/images/createFolder.png' onClick={(x) => { return null; }}></MenuButton>
        </div>
      </div>
      <div className={styles.folders}>
          <Folders path='./files' pathClicked={pathClicked} setPathClicked={setPathClicked} ></Folders>
        </div>
    </div>
  );
}

export default FolderSite;
