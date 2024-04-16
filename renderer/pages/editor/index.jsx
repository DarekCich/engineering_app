import React from "react";
import styles from "./index.module.css";
function Standard({file}) {
    return (<>
    <div className={styles.text}>This is a standard file reader</div>
    <div className={styles.file}>{file}</div>
    </>);
}
export default Standard;
