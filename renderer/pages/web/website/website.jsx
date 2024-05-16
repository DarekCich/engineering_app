import React from "react";
import axios from "axios";
import styles from "./website.module.css";

function MenuPage({ setUserLogin }) {
    const onClick = () => {
        axios.defaults.headers["Authorization"] = "";
        localStorage.setItem("djangoToken", "");
        setUserLogin("");
    };
    return (
        <div className={styles.menu}>
            <button onClick={onClick}>wyloguj</button>
            <webview
                className={styles.frame}
                src="http://127.0.0.1:8000/website/filespublic/"
                sandbox="allow-same-origin allow-forms allow-scripts"
            ></webview>
        </div>
    );
}
// sandbox="allow-same-origin allow-forms allow-scripts"
export default MenuPage;
