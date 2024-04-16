import React, { useState, useEffect } from "react";
import { Menu, Item, Separator, Submenu, useContextMenu } from "react-contexify";
import "react-contexify/ReactContexify.css";
import { readFile } from "../../../../../main/backend/fileMenager.js";

import axios from "axios";

import styles from "./file.module.css";
import Icon from "../../../folderSite/icon/icon";
import { fileRename, fileRemove } from "../../../../../main/backend/fileMenager";

function File({
    path,
    pathClicked,
    setReload,
    setFileClicked,
    fileClicked,
    addToPages,
    changeReload,
    setBubbleMessage,
}) {
    const [rename, setRename] = useState(false);
    const [newName, setNewName] = useState(path.split("/").pop());

    const changeValue = (val) => {
        const value = val.target.value;
        if (value.length < 15) {
            setNewName(value);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter" && rename) {
            if (newName !== "") fileRename(pathClicked, path, newName);
            else setNewName(path);
            setRename(false);
            setReload();
        }
    };

    const deleteFile = () => {
        fileRemove(pathClicked + "/" + path);
        setReload();
    };

    useEffect(() => {
        if (fileClicked !== path && rename) {
            if (newName !== "") fileRename(pathClicked, path, newName);
            else setNewName(path);
            setRename(false);
            setReload();
        }
    }, [fileClicked]);

    const MENU_ID = `menu-id${path}`;
    const { show } = useContextMenu({
        id: MENU_ID,
    });

    function handleItemClick({ event, props, triggerEvent, data }) {
        console.log(event, props, triggerEvent, data);
    }

    function handleRename() {
        console.log(path, fileClicked);
        setRename(true);
    }

    async function shareFile() {
        let file = await readFile(pathClicked + "/" + path);
        let params = {
            nazwa: fileClicked,
            tresc: file,
        };
        console.log(params);
        await axios.post("http://127.0.0.1:8000/api/files/", params).catch((error) => {
            setBubbleMessage("błąd w trakcie wysyłania pliku");
            console.error("Błąd podczas wysyłania danych:", error);
        });
    }

    function displayMenu(e) {
        e.stopPropagation();
        setFileClicked(path);
        show({
            event: e,
        });
    }

    return (
        <>
            <div
                className={styles.file}
                onClick={() => {
                    setFileClicked(path);
                }}
                onDoubleClick={() => {
                    addToPages(pathClicked + "/" + path);
                }}
                onContextMenu={displayMenu}
            >
                <div className={fileClicked === path ? styles.isClicked : styles.isntClicked}>
                    {fileClicked === path ? (
                        <div className={styles.imgAndButton}>
                            <button className={styles.buttonDel} onClick={deleteFile}>
                                <img
                                    src="/images/delete.png"
                                    alt="delete"
                                    className={styles.buttonDelImg}
                                />
                            </button>
                            <Icon name={path} />
                        </div>
                    ) : (
                        <Icon name={path} />
                    )}
                    <div
                        className={styles.name}
                        onDoubleClick={(e) => {
                            e.stopPropagation();
                            setRename(true);
                            setNewName(path);
                        }}
                    >
                        {rename ? (
                            <input
                                type="text"
                                value={newName}
                                onChange={(val) => {
                                    changeValue(val);
                                }}
                                onKeyDown={handleKeyDown}
                                className={styles.inputName}
                            ></input>
                        ) : (
                            path
                        )}
                    </div>
                </div>
            </div>

            <Menu id={MENU_ID} className="contexify_theme-dark">
                <Item
                    onClick={() => {
                        addToPages(pathClicked + "/" + path);
                    }}
                >
                    Otwórz
                </Item>
                <Item onClick={handleRename}>Zmień nazwę</Item>
                <Item onClick={changeReload}>Odśwież</Item>
                <Separator />
                <Item onClick={deleteFile}>Usuń</Item>
                <Separator />
                <Item onClick={shareFile}>Wyślij na serwer</Item>
            </Menu>
        </>
    );
}

export default File;

{
    /* <Menu id={MENU_ID}>
        <Item onClick={handleItemClick}>
          Item 1
        </Item>
        <Item onClick={handleItemClick}>
          Item 2
        </Item>
        <Separator />
        <Item disabled>Disabled</Item>
        <Separator />
        <Submenu label="Submenu">
          <Item onClick={handleItemClick}>
            Sub Item 1
          </Item>
          <Item onClick={handleItemClick}>Sub Item 2</Item>
        </Submenu>
      </Menu>
    </div> */
}
