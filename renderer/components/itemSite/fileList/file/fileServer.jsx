import styles from "./file.module.css";
import Icon from "../../../folderSite/icon/icon";
import { Menu, Item, Separator, Submenu, useContextMenu } from "react-contexify";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

function FileServer({
    shared,
    path,
    dane,
    danePelne,
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
            if (newName !== "")
                axios.patch(`http://127.0.0.1:8000/api/files/${dane.id}/`, { nazwa: newName });
            else setNewName(path);
            setRename(false);
            nazwa = newName;
        }
    };
    const handleAddToPages = () => {
        addToPages(nazwa + "//" + path + "//" + (shared ? "sh" : "my"));
    };
    const deleteFile = async () => {
        try {
            if (shared) {
                console.log(danePelne);
                await axios.delete(`http://127.0.0.1:8000/api/sharedfiles/${danePelne.id}/`);
            } else {
                await axios.delete(`http://127.0.0.1:8000/api/files/${dane.id}/`);
            }
        } catch (error) {
            console.error('Error deleting file:', error);
        } finally {
            setReload();
        }
    };
    

    useEffect(() => {
        if (fileClicked !== path && rename) {
            if (newName !== "")
                axios.patch(`http://127.0.0.1:8000/api/files/${dane.id}/`, { nazwa: newName });
            else setNewName(nazwa);
            setRename(false);
            nazwa = newName;
        }
    }, [fileClicked]);

    const MENU_ID = `menu-id${path}`;
    const { show } = useContextMenu({
        id: MENU_ID,
    });

    function handleItemClick({ event, props, triggerEvent, data }) {
        if(shared){
            axios.get(`http://127.0.0.1:8000/website/downloadshared/${String(dane.id)}/`, {responseType: 'blob'}).then(response => {
                // Tworzenie obiektu URL z odpowiedzi
                const url = window.URL.createObjectURL(new Blob([response.data]));
                // Tworzenie linku do pobrania pliku
                const link = document.createElement('a');
                link.href = url;
                // Ustawienie nazwy pliku na podstawie nagłówka Content-Disposition
                const contentDisposition = response.headers['content-disposition'];
                const filename = contentDisposition.split('filename=')[1];
                link.setAttribute('download', filename.trim());
                // Dodanie linku do dokumentu i kliknięcie w niego (uruchomienie pobierania pliku)
                document.body.appendChild(link);
                link.click();
                // Usunięcie linku z dokumentu
                document.body.removeChild(link);
            })
        }
        else{
            axios.get(`http://127.0.0.1:8000/website/downloadmy/6/`, {responseType: 'blob'}).then(response => {
                // Tworzenie obiektu URL z odpowiedzi
                const url = window.URL.createObjectURL(new Blob([response.data]));
                // Tworzenie linku do pobrania pliku
                const link = document.createElement('a');
                link.href = url;
                // Ustawienie nazwy pliku na podstawie nagłówka Content-Disposition
                const contentDisposition = response.headers['content-disposition'];
                const filename = contentDisposition.split('filename=')[1];
                link.setAttribute('download', filename.trim());
                // Dodanie linku do dokumentu i kliknięcie w niego (uruchomienie pobierania pliku)
                document.body.appendChild(link);
                link.click();
                // Usunięcie linku z dokumentu
                document.body.removeChild(link);
            }).catch(error => console.log(error))
        }
        console.log(event, props, triggerEvent, data);
    }
    function handleRename() {
        if (!shared) setRename(true);
    }
    function handleFormSubmit(event) {
        event.preventDefault();
        axios.post("http://127.0.0.1:8000/api/sharedfiles/", { file: dane.id, user: usernameRef.current.value });
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
                            Udostępnij
                        </button>
                    </form>
                </div>
            )}
            <div
                className={styles.file}
                onClick={() => {
                    setFileClicked(path);
                }}
                onDoubleClick={handleAddToPages}
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
                <Item onClick={handleAddToPages}>Otwórz</Item>
                <Item onClick={handleRename}>Zmień nazwę</Item>
                <Item onClick={changeReload}>Odśwież</Item>
                <Separator />
                <Item onClick={deleteFile}>Usuń</Item>
                
                {shared? null : <><Separator /> <Item onClick={toggleFormVisibility}>Udostępnij innym</Item></>}
                {/* <Submenu label="Udostępnianie">
                    <Item onClick={handleItemClick}>Pobierz</Item>
                    
                </Submenu> */}
            </Menu>
        </>
    );
}

export default FileServer;
