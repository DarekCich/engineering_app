import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";
import styles from "../../Style/homePage.module.css";
import ItemsSite from "../components/itemSite/itemsSite";
import FolderSite from "../components/folderSite/folderSite";

function HomePage({ addToPages,setBubbleMessage }) {
    const [pathClicked, setPathClicked] = useState("");
    return (
        <React.Fragment>
            <Head>
                <title>Home </title>
            </Head>
            <div className={styles.homePage}>
                <div className={styles.content}>
                    <FolderSite pathClicked={pathClicked} setPathClicked={setPathClicked} />
                    <ItemsSite pathClicked={pathClicked} addToPages={addToPages} setBubbleMessage={setBubbleMessage} />
                </div>
            </div>
        </React.Fragment>
    );
}

export default HomePage;
