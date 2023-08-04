import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../../Style/home.module.css'
import ItemsSite from '../components/itemsSite'
function Home() {
  return (
    <React.Fragment>
      <Head>
        <title>Home </title>
      </Head>
      <div className={styles.homePage}>
        <div className={styles.bar}>
        </div>
        <div className={styles.content}>
          <div className={styles.folderSite}>
            <div className={styles.folderBar}>
              <div className={styles.folderName}>Lista Folderów</div>
              <div className={styles.folderButtons}>
                <button className={styles.folderButton}>
                  <img src='/images/reload.png' className={styles.iconsFolderButtons}></img>
                </button>
                <button className={styles.folderButton}>
                  <img src='/images/createFolder.png' className={styles.iconsFolderButtons}></img>
                </button>
                
              </div>
            </div>
          </div>
          <ItemsSite/>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
