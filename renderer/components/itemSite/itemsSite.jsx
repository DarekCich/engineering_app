import styles from './itemsSite.module.css'
import FileList from './fileList/fileList';
function ItemsSite({pathClicked}){

    return(
    <div className={styles.itemsSite}>
        <FileList pathClicked={pathClicked}/>
        <div className={styles.fileDetails}>
            <div className={styles.fileView}></div>
            <div className={styles.fileDetail}></div>
        </div>
    </div>
    )
}

export default ItemsSite;