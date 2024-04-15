import React from "react";
import axios from "axios";
import styles from "./menu.module.css";

function MenuPage({ setUserLogin }) {
    return (
        <div className={styles.menu}>
            menu
            <button
                onClick={() => {
                    axios.defaults.headers["Authorization"] = "";
                    localStorage.setItem("jwtToken", "");
                    setUserLogin("");
                }}
            >
                wyloguj
            </button>
            <webview className={styles.frame} src="http://127.0.0.1:8000/api/web/files_public/" sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-orientation-lock allow-pointer-lock allow-top-navigation  allow-modals allow-popups-to-escape-sandbox allow-presentation allow-top-navigation-by-user-activation allow-scripts" allow="encrypted-media" ></webview>

            {/* <iframe className={styles.frame} src="http://127.0.0.1:8000/api/web/files_public/" title="description" ></iframe>  */}
        </div>
    );
}
// sandbox="allow-same-origin allow-forms allow-scripts"
export default MenuPage;
