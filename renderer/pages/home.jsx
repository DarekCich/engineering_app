import React, { useEffect, useRef, useState } from "react";
import "react-quill/dist/quill.snow.css";
import "../../Style/main.css";
import Head from "next/head";
import styles from "../../Style/home.module.css";
import HomePage from "./homePage";
import WebPage from "./web/web";
import MyComponent from "./editor/edit";
import Bubble from "./helpers/bubble";

function Home() {
    const [isDark, setIsDark] = useState(true);
    const [paths, setPaths] = useState([]);
    const [actualPage, setActualPage] = useState(null);
    const [bubbleMessage, setBubbleMessage] = useState("");
    const handleCloseBubble = () => {
        setBubbleMessage(""); // Funkcja zamykająca dymek
    };
    const handleSetBubbleMessage = (message) => {
        setBubbleMessage(message); // Funkcja zamykająca dymek
    };
    const addToPages = (path) => {
        if (paths.includes(path)) setActualPage(path);
        else setPaths([...paths, path]);
    };
    const deletePath = (path) => {
        setPaths(paths.filter((item) => item !== path));
        setActualPage(null);
    };

    useEffect(() => {
        if (!paths.includes(actualPage)) setActualPage(null);
    }, [paths]);

    return (
        <>
            <Head>
                <title>Home</title>
            </Head>
            <div className={styles.homePage} data-theme={isDark ? "dark" : "light"}>
                <div className={styles.bar}>
                    <img
                        src="/images/icony.png"
                        alt="menuStart"
                        onClick={() => setActualPage(null)}
                        className={styles.mainMenu}
                    />
                    <img
                        src="/images/opcje.png"
                        alt="web"
                        onClick={() => setActualPage(-1)}
                        className={styles.mainMenu + " " + styles.reverse}
                    />
                    <div className="checkbox-wrapper-3">
                        <input
                            type="checkbox"
                            id="cbx-3"
                            className="toggle"
                            onChange={() => setIsDark(!isDark)}
                            checked={isDark}
                        />
                        <label htmlFor="cbx-3" className="toggle"><span></span></label>
                    </div>
                    {paths.map((x, index) => (
                        <div className={styles.tab} key={index} onClick={() => setActualPage(x)}>
                            {x.includes("//")? x.split("//")[0] : x}
                            <button onClick={() => deletePath(x)}>x</button>
                        </div>
                    ))}
                </div>
                <div className={styles.pages}>
                    <div className={actualPage === null ? styles.showed : styles.notShowed}>
                        <HomePage addToPages={addToPages} setBubbleMessage={setBubbleMessage} />
                    </div>
                    <div className={actualPage === -1 ? styles.showed : styles.notShowed}>
                        <WebPage setBubbleMessage={setBubbleMessage} />
                    </div>
                    {paths.map((x, index) => (
                        <div
                            className={x === actualPage ? styles.showed : styles.notShowed}
                            key={index}
                        >
                            <MyComponent path={x} setBubbleMessage={handleSetBubbleMessage} />
                        </div>
                    ))}
                </div>
                {bubbleMessage && <Bubble message={bubbleMessage} onClose={handleCloseBubble} />}
            </div>
        </>
    );
}

export default Home;
