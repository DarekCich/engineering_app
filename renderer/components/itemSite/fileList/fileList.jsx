import styles from "./fileList.module.css";
import MenuButton from "../../buttons/menuButton";
import React, { useState, useEffect } from "react";
import { fileListOfFiles, fileCreate, fileRename } from "../../../../main/backend/fileMenager";
import File from "./file/file";
import FileServer from "./file/fileServer";

function FileList({
    pathClicked,
    addToPages,
    fileList,
    setfileList,
    fileClicked,
    setFileClicked,
    setBubbleMessage,
}) {
    const [reload, setReload] = useState(false);

    const newFile = async () => {
        if (!pathClicked) {
            setBubbleMessage("Wybierz folder.");
            return;
        }

        if (pathClicked.includes("@SERVER")) {
            setBubbleMessage("Nie można tworzyć plików w zasobach sieciowych.");
            return;
        }
        let tmp = pathClicked + "/newFile";
        await fileCreate(tmp);
        tmp = fileListOfFiles(pathClicked);
        if (tmp[0] === -1 || tmp[0] === -2) {
            return;
        }
        const element = tmp.find((item) => !fileList.includes(item));
        if (element !== undefined) {
            setFileClicked(element);
        }
        setfileList(tmp);
    };

    const changeReload = () => {
        setReload(!reload);
    };

    const fileListOfFilesOnServertest = async () => {
        let tmp = [];
        const url =
            pathClicked === "@SERVER@"
                ? "http://localhost:8000/api/files/"
                : "http://localhost:8000/api/sharedfiles/shared_file_to_me/";
        try {
            const axios = require("axios"); // Importujemy axios tutaj
            const response = await axios.get(url, {
                headers: {
                    Authorization:
                        typeof localStorage !== "undefined"
                            ? localStorage.getItem("djangoToken")
                            : null,
                },
            });
            console.log(response.data);
            tmp = response.data;
            setfileList(tmp);
            setFileClicked("");
        } catch (error) {
            console.error("Błąd podczas pobierania plików z serwera:", error);
        } finally{
            setfileList(tmp);
            setFileClicked("");
        }
    };

    useEffect(() => {
        setfileList([]);
        if (typeof window !== "undefined") {
            let tmp;
            if (pathClicked !== "@SERVER@" && pathClicked !== "@SERVERSHARED@") {
                tmp = fileListOfFiles(pathClicked);
                if (tmp[0] === -1 || tmp[0] === -2) {
                    return;
                }
                setfileList(tmp);
                setFileClicked("");
            } else fileListOfFilesOnServertest();
        }
    }, [pathClicked]);

    useEffect(() => {
        setfileList([]);
        if (typeof window !== "undefined") {
            let tmp;
            if (pathClicked !== "@SERVER@" && pathClicked !== "@SERVERSHARED@") {
                tmp = fileListOfFiles(pathClicked);
                if (tmp[0] === -1 || tmp[0] === -2) {
                    return;
                }
                setfileList(tmp);
                setFileClicked("");
            } else fileListOfFilesOnServertest();
        }
    }, [reload]);

    return (
        <div className={styles.fileList}>
            <div className={styles.fileBar}>
                <div className={styles.folderName}>
                    {pathClicked === "./files" && "Pliki Lokalne"}
                    {pathClicked === "@SERVER@" && "Pliki Zdalne"}
                    {pathClicked === "@SERVERSHARED@" && "Pliki Udostępnione"}
                    {pathClicked !== "./files" &&
                        pathClicked !== "@SERVER@" &&
                        pathClicked !== "@SERVERSHARED@" &&
                        pathClicked.split("/").pop()}
                </div>
                <div className={styles.fileButtons}>
                    <MenuButton url="/images/reload.png" onClick={changeReload}></MenuButton>
                    <MenuButton url="/images/addFile.png" onClick={newFile}></MenuButton>
                </div>
            </div>
            <div className={styles.files}>
                {pathClicked !== "@SERVER@" && pathClicked !== "@SERVERSHARED@"
                    ? fileList.map((x, index) =>
                          typeof x !== "object" ? (
                              <File
                                  path={x}
                                  key={index}
                                  pathClicked={pathClicked}
                                  setReload={changeReload}
                                  fileClicked={fileClicked}
                                  setFileClicked={setFileClicked}
                                  addToPages={addToPages}
                                  changeReload={changeReload}
                                  setBubbleMessage={setBubbleMessage}
                              ></File>
                          ) : null
                      )
                    : fileList.map((x, index) =>
                          typeof x === "object" ? (
                              <FileServer
                                  shared={pathClicked === "@SERVERSHARED@"}
                                  path={String(x.id)}
                                  dane={pathClicked !== "@SERVERSHARED@" ? x : x.file}
                                  danePelne={x}
                                  key={index}
                                  pathClicked={pathClicked}
                                  setReload={changeReload}
                                  fileClicked={fileClicked}
                                  setFileClicked={setFileClicked}
                                  addToPages={addToPages}
                                  changeReload={changeReload}
                                  setBubbleMessage={setBubbleMessage}
                              ></FileServer>
                          ) : null
                      )}
            </div>
        </div>
    );
}

export default FileList;
