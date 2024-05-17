import React from "react";
import styles from "./index.module.css"
function Sample({ file, save }) {
    return (
        <div className={styles.file}>
            <div className={styles.text}>{file || "file is empty"}</div>
        </div>
    );
}
export default Sample;