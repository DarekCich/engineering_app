import React, { useEffect, useRef, useState } from "react";
import {
    folderListOfFolders,
    folderCreateRoot,
    folderRename,
    folderRemove,
} from "../../../../main/backend/folderMenager";
import styles from "./folderList.module.css";
function Folders({ path, show, pathClicked, setPathClicked, reload }) {
    const [showSelf, setShowSelf] = useState(false);
    const [folderList, setFolderList] = useState([]);
    const [showList, setShowList] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [rename, setRename] = useState(false);
    const [newName, setNewName] = useState(path.split("/").pop());
    const handleHoverT = () => {
        setIsHovered(true);
    };
    const handleHoverF = () => {
        setIsHovered(false);
    };
    const deleteFolder = () => {
        folderRemove(path);
    };
    const clicked = () => {
        setShowList(!showList);
        setPathClicked(path);
        setFolderList(folderListOfFolders(path));
        setNewName(path.split("/").pop());
    };
    const changeValue = (val) => {
        const value = val.target.value;
        if (value.length < 15) {
            setNewName(value);
        }
    };
    const handleKeyDown = (event) => {
        if (event.key === "Enter" && pathClicked === path && rename) {
            setRename(false);
            if (newName !== "") folderRename(path, newName);
            else setNewName(path);
        }
    };
    useEffect(() => {
        if (typeof window !== "undefined") {
            folderCreateRoot();
            const tmp = folderListOfFolders(path);
            if (tmp[0] === -1 || tmp[0] === -2) {
                return;
            }
            setShowSelf(true);
            if (tmp != "undefined") {
                setFolderList(folderListOfFolders(path));
            }

            if (show !== undefined) setShowList(show);
        }
    }, []);

    useEffect(() => {
        if (pathClicked !== path && rename) {
            setRename(false);
            if (newName !== "") folderRename(path, newName);
            else setNewName(path);
        }
    }, [pathClicked]);

    useEffect(() => {
        setFolderList(folderListOfFolders(path));
    }, [reload]);
    if (showSelf)
        return (
            <div className={styles.folderBox}>
                <div
                    className={styles.folder}
                    onClick={clicked}
                    onMouseEnter={handleHoverT}
                    onMouseLeave={handleHoverF}
                >
                    <div className={pathClicked === path ? styles.clicked : styles.nonClicked}>
                        {showList ? (
                            <img src="/images/arrowDown.png" className={styles.folderImg}></img>
                        ) : (
                            <img src="/images/arrowRight.png" className={styles.folderImg}></img>
                        )}

                        <div
                            className={styles.nonActive}
                            onDoubleClick={() => {
                                if (path !== "./files") setRename(true);
                            }}
                        >
                            <div className={styles.folderName}>
                                {rename && pathClicked === path ? (
                                    <input
                                        type="text"
                                        value={newName}
                                        onChange={(val) => {
                                            changeValue(val);
                                        }}
                                        onKeyDown={handleKeyDown}
                                    ></input>
                                ) : path === "./files" ? (
                                    "Pliki Lokalne"
                                ) : (
                                    path.split("/").pop()
                                )}
                            </div>
                        </div>
                        {pathClicked === path && pathClicked !== "./files" ? (
                            <div className={styles.deleteButton}>
                                <button onClick={deleteFolder} className={styles.buttonDel}>
                                    <img
                                        src="/images/delete.png"
                                        alt="delete"
                                        className={styles.buttonDelImg}
                                    />
                                </button>
                            </div>
                        ) : null}
                    </div>
                </div>
                <div className={styles.line}></div>
                <ul className={styles.listUl}>
                    {showList
                        ? folderList.map((x, index) => (
                              <li key={index} className={styles.folderLi}>
                                  <Folders
                                      path={path + "/" + x}
                                      pathClicked={pathClicked}
                                      setPathClicked={setPathClicked}
                                      reload={reload}
                                  ></Folders>
                              </li>
                          ))
                        : null}
                </ul>
            </div>
        );
    else return null;
}

export default Folders;
