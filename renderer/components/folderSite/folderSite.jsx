import styles from './folderSite.module.css'
import MenuButton from '../buttons/menuButton'
function FolderSite(){
    return(
    <div className={styles.folderSite}>
        <div className={styles.folderBar}>
          <div className={styles.folderName}>Lista Folderów</div>
          <div className={styles.folderButtons}>
            <MenuButton url='/images/reload.png' onClick={(x)=>{return null}}></MenuButton>
            <MenuButton url='/images/createFolder.png'  onClick={(x)=>{return null}}></MenuButton>         
          </div>
        </div>
      </div>
      )
}

export default FolderSite;