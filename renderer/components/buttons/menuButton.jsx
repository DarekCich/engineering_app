import React from 'react'
import styles from './menuButton.module.css'

function MenuButton(props){
    return (
        <button onClick={props.onClick} className={styles.folderButton}>
            <img src={props.url} className={styles.iconsFolderButtons}></img>
        </button>
    )
}
export default MenuButton