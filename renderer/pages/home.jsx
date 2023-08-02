import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../../Style/home.module.css'
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
          </div>
          <div className={styles.itemsSite}>
            <div className={styles.fileList}>
            </div>
            <div className={styles.fileDetails}>
              <div className={styles.fileView}></div>
              <div className={styles.fileDetail}></div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
