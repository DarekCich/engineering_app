import React from "react";

import Folders from "./folderList";
import FoldersServer from "./folderListServer";
import styles from "./folderList.module.css";
function FoldersMain({ path, show, pathClicked, setPathClicked, reload }) {
  return (
    <div className={styles.folderBox}>
      <ul className={styles.listUl}>
        <li className={styles.folderLi}>
          <FoldersServer
            path="@SERVER@"
            pathClicked={pathClicked}
            setPathClicked={setPathClicked}
            reload={reload}
          ></FoldersServer>
        </li>
        <li className={styles.folderLi}>
          <Folders
            path={path}
            pathClicked={pathClicked}
            setPathClicked={setPathClicked}
            reload={reload}
          ></Folders>
        </li>
      </ul>
    </div>
  );
}

export default FoldersMain;
