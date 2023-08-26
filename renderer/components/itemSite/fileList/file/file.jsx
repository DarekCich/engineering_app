import styles from './file.module.css'
import Icon from '../../../folderSite/icon/icon';
function File({path}){

    return(
    <div className={styles.file}>
        <Icon name={ path}/>
        <div className={styles.name}>
            {path}
        </div>

    </div>
    )
}

export default File;