import styles from './menuButton.module.css'

function MenuButton(props){
    const handleClick = () => {
        setIsClicked(true);
        setTimeout(() => {
            setIsClicked(false);
        }, 500);
    };
    return (
        <button onClick={props.onClick} className={styles.folderButton}>
            <img src={props.url} className={styles.iconsFolderButtons}></img>
        </button>
    )
}
export default MenuButton