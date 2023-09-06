import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import styles from '../../Style/home.module.css'
import HomePage from './homePage';
import MyComponent from './editor/edit';

function Home() {
  const [ paths,               setPaths] = useState([])
  const [ actualPage,     setActualPage] = useState(null)

  const addToPages = (path) => {
    console.log('git');
    if (paths.includes(path))
      setActualPage(path)
    else
      setPaths([...paths, path]);
  };

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
          
        {paths.map((x, index) => (
          <div className={styles.tab} key={index} onClick={()=>{ setActualPage(x)}}>
            {x}
          </div>
        ))}
        </div>
        <div className={styles.pages}>
          <div className={actualPage === null ? styles.showed : styles.notShowed}><HomePage addToPages={addToPages}/></div>
        {
          paths.map((x, index) => {
            return  <div className={x == actualPage ? styles.showed : styles.notShowed}> <MyComponent path={x} key={index} /> </div>
          })
        }
        
        </div>
      
      </div>
    </>
  );
};

export default Home;
