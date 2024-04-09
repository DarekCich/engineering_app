import React, { useState } from "react";
import styles from "./itemsSite.module.css";
import FileList from "./fileList/fileList";

function ItemsSite({ pathClicked, addToPages, setBubbleMessage }) {
    const [fileList, setfileList] = useState([]);
    const [fileClicked, setFileClicked] = useState("");

    return (
        <div className={styles.itemsSite}>
            <FileList
                pathClicked={pathClicked}
                addToPages={addToPages}
                fileList={fileList}
                setfileList={setfileList}
                fileClicked={fileClicked}
                setFileClicked={setFileClicked}
                setBubbleMessage={setBubbleMessage}
            />
            <div className={styles.fileDetails}>
                {fileList.map((x, index) => {
                    if (x.id == fileClicked) {
                        return (
                            <ul key={index}>
                                <Szczegoly key={index} szczegoly={x} />
                            </ul>
                        );
                    } else {
                        return null;
                    }
                })}
            </div>
        </div>
    );
}

function Szczegoly({ szczegoly }) {
    return (
        <>
            {Object.keys(szczegoly).map((key, index) => {
                if (typeof szczegoly[key] === "object") {
                    return <Szczegoly key={index} szczegoly={szczegoly[key]} />;
                } else {
                    return (
                        <li key={index}>
                            <div>{key}</div>
                            <div>{szczegoly[key]}</div>
                        </li>
                    );
                }
            })}
        </>
    );
}

export default ItemsSite;
