import React, { useEffect, useRef, useState } from "react";
import {
  folderListOfFolders,
  folderCreateRoot,
  folderRename,
  folderRemove,
} from "../../../../main/backend/folderMenager";
import styles from "./folderList.module.css";
function FoldersServer({ path, show, pathClicked, setPathClicked, reload }) {
  const [showSelf, setShowSelf] = useState(false);
  const [folderList, setFolderList] = useState([]);
  const [isHovered, setIsHovered] = useState(false);

  const [showList, setShowList] = useState(false);
  const [rename, setRename] = useState(false);
  const [newName, setNewName] = useState(path.split("/").pop());
  const handleHoverT = () => {
    setIsHovered(true);
  };
  const handleHoverF = () => {
    setIsHovered(false);
  };
  const deleteFolder = () => {
    folderRemove(path);
  };
  const clicked = () => {
    setShowList(!showList);
    setPathClicked(path);
    setFolderList(folderListOfFolders(path));
    setNewName(path.split("/").pop());
  };
  const changeValue = (val) => {
    const value = val.target.value;
    if (value.length < 15) {
      setNewName(value);
    }
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && pathClicked === path && rename) {
      setRename(false);
      if (newName !== "") folderRename(path, newName);
      else setNewName(path);
    }
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("jwtToken")) setShowSelf(true);
    }
  }, []);

  useEffect(() => {
    if (pathClicked !== path && rename) {
      setRename(false);
      if (newName !== "") folderRename(path, newName);
      else setNewName(path);
    }
  }, [pathClicked]);

  useEffect(() => {
    setFolderList(folderListOfFolders(path));
    if (typeof window !== "undefined") {
      if (localStorage.getItem("jwtToken")) setShowSelf(true);
    }
  }, [reload]);
  if (showSelf)
    return (
      <div className={styles.folderBox}>
        <div
          className={styles.folder}
          onClick={clicked}
          onMouseEnter={handleHoverT}
          onMouseLeave={handleHoverF}
        >
          <div
            className={
              pathClicked === path ? styles.clicked : styles.nonClicked
            }
          >
            <div
              className={styles.nonActive}
              onDoubleClick={() => {
                setRename(true);
              }}
            >
              <div className={styles.folderName}>&#160;&#160;&#160;Pliki Zdalne</div>
            </div>
          </div>
        </div>
        <div className={styles.line}></div>
      </div>
    );
  else return null;
}

export default FoldersServer;
