import styles from '../../Style/itemsSite.module.css'
function ItemsSite(){

    return(
     <div className={styles.itemsSite}>
        <div className={styles.fileList}>
        </div>
        <div className={styles.fileDetails}>
            <div className={styles.fileView}></div>
            <div className={styles.fileDetail}></div>
        </div>
    </div>
    )
}

export default ItemsSite;