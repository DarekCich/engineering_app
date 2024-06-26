import styles from "./folderSite.module.css";
import MenuButton from "../buttons/menuButton";
import FoldersMain from "./folders/folderListMain";
import React, { useState } from "react";
import { folderCreate } from "../../../main/backend/folderMenager";
function FolderSite({ pathClicked, setPathClicked, setBubbleMessage }) {
    const [reload, setReload] = useState(false);
    const click = () => {
        setReload(!reload);
    };
    const newFolder = async () => {
        if(pathClicked.includes("@SERVER")){
            setBubbleMessage("Nie można tworzyć folderów w zasobach sieciowych.")
            return
        }
        let tmp = pathClicked + "/newFolder";
        await folderCreate(tmp);
        setReload(!reload);
    };
    function reloadEvrySecond() {
        setInterval(() => {
            setReload(!reload);
        }, 5000);
    }

    // Wywołanie funkcji
    reloadEvrySecond();
    return (
        <div className={styles.folderSite}>
            <div className={styles.folderBar}>
                <div className={styles.folderName}>Lista Folderów</div>
                <div className={styles.folderButtons}>
                    <MenuButton url="/images/reload.png" onClick={click}></MenuButton>
                    <MenuButton url="/images/createFolder.png" onClick={newFolder}></MenuButton>
                </div>
            </div>
            <div className={styles.folders}>
                <FoldersMain
                    path="./files"
                    pathClicked={pathClicked}
                    setPathClicked={setPathClicked}
                    reload={reload}
                ></FoldersMain>
            </div>
        </div>
    );
}

export default FolderSite;
