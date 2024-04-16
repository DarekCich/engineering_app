import styles from "./file.module.css";
import Icon from "../../../folderSite/icon/icon";
import { Menu, Item, Separator, Submenu, useContextMenu } from "react-contexify";
import { fileRename, fileRemove } from "../../../../../main/backend/fileMenager";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

function FileServer({
    shared,
    path,
    dane,
    pathClicked,
    setReload,
    setFileClicked,
    fileClicked,
    addToPages,
    changeReload,
}) {
    let nazwa = "";
    if (dane)
        if (dane.nazwa) nazwa = dane.nazwa;
        else nazwa = dane.file.nazwa;
    const [rename, setRename] = useState(false);
    const [newName, setNewName] = useState(nazwa);
    const [showForm, setShowForm] = useState(false);
    const usernameRef = useRef(null);

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
        if (shared) axios.delete(`http://127.0.0.1:8000/api/sharedfiles/${dane.id}/`);
        else axios.delete(`http://127.0.0.1:8000/api/files/${dane.id}/`);
        setReload();
    };

    useEffect(() => {
        if (fileClicked !== path && rename) {
            if (newName !== "") fileRename(pathClicked, path, newName);
            else setNewName(nazwa);
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
        setRename(true);
    }
    function handleFormSubmit(event) {
        event.preventDefault();
        // Dodaj logikę obsługi submita formularza (np. wysłanie danych)
        console.log("Wysyłanie danych z formularza...");
        setShowForm(false);
    }

    function displayMenu(e) {
        e.stopPropagation();
        setFileClicked(path);
        show({
            event: e,
        });
    }

    function toggleFormVisibility() {
        setShowForm(!showForm);
    }

    // Obsługa kliknięcia poza obszarem formularza
    useEffect(() => {
        function handleClickOutside(event) {
            if (!event.target.closest(`.${styles.formContainer}`)) {
                setShowForm(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <>
            {showForm && (
                <div className={styles.formContainer}>
                    <div className={styles.title}>Udostępnianie pliku</div>
                    <div className={styles.subTitle}>{nazwa}</div>

                    <label htmlFor="username"> użytkownikowi:</label>
                    <form onSubmit={handleFormSubmit} className={styles.form}>
                        <input
                            id="username"
                            type="text"
                            placeholder="Username"
                            ref={usernameRef}
                            className={styles.input}
                        />
                        <button type="submit" className={styles.button}>
                            Submit
                        </button>
                    </form>
                </div>
            )}
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
                            <Icon name={nazwa} />
                        </div>
                    ) : (
                        <Icon name={nazwa} />
                    )}
                    <div
                        className={styles.name}
                        onDoubleClick={(e) => {
                            e.stopPropagation();
                            handleRename();
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
                        ) : typeof dane === "undefined" ? null : (
                            nazwa
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
                <Submenu label="Udostępnianie">
                    <Item onClick={handleItemClick}>Pobierz</Item>
                    <Item onClick={toggleFormVisibility}>Udostępnij innym</Item>
                </Submenu>
            </Menu>
        </>
    );
}

export default FileServer;
