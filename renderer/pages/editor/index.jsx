import React from "react";
import styles from "./index.module.css";
function Standard({file}) {
    return (<div className={styles.body}>
        <div className={styles.text}>This is a standard file reader</div>
        <div className={styles.file}>{file || "file is empty"}</div>
    </div>);
}
export default Standard;
