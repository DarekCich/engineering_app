import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../../Style/home.module.css'
import ItemsSite from '../components/itemSite/itemsSite'
import FolderSite from '../components/folderSite/folderSite'
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
          <FolderSite/>
          <ItemsSite/>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
