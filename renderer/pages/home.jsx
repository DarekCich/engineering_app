import React, { useEffect, useRef, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import '../../Style/main.css';
import Head from 'next/head';
import styles from '../../Style/home.module.css';
import HomePage from './homePage';
import OptionsPage from './options/options'
import MyComponent from './editor/edit';

function Home() {
  const [paths, setPaths] = useState([]);
  const [actualPage, setActualPage] = useState(null);

  const addToPages = (path) => {
    if (paths.includes(path)) setActualPage(path);
    else setPaths([...paths, path]);
  };
  const deletePath = (path) => {
    setPaths(paths.filter((item)=> item !== path));
    setActualPage(null);
  };

  useEffect(() => {
    if(!paths.includes(actualPage))
      setActualPage(null);
  }, [paths]); 

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div className={styles.homePage}>
        <div className={styles.bar}>
          <img
            src="/images/icony.png"
            alt="menuStart"
            onClick={() => setActualPage(null)}
            className={styles.mainMenu}
          />
          <img
            src="/images/opcje.png"
            alt="opcje"
            onClick={() => setActualPage(-1)}
            className={styles.mainMenu}
          />

          {paths.map((x, index) => (
            <div className={styles.tab} key={index} onClick={() => setActualPage(x)}>
              {x}
              <button onClick={() => deletePath(x)}>x</button>
            </div>
          ))}
        </div>
        <div className={styles.pages}>
          <div className={actualPage === null ? styles.showed : styles.notShowed}>
            <HomePage addToPages={addToPages} />
          </div>
          <div className={actualPage === -1 ? styles.showed : styles.notShowed}>
            <OptionsPage />
          </div>
          {paths.map((x, index) => (
            <div className={x === actualPage ? styles.showed : styles.notShowed} key={index}>
              <MyComponent path={x} />
            </div>
          ))}

        </div>
      </div>
    </>
  );
}

export default Home;
