import React, { useEffect, useRef, useState } from 'react';
import { listItemInFolder, createRootFolder } from '../../../../main/backend/folderMenager';
import styles from './folderList.module.css'
function Folders({ path,show, pathClicked, setPathClicked }) {
    const [folderList,      setFolderList] = useState([]);
    const [showList,          setShowList] = useState(false);
    const [isHovered,        setIsHovered] = useState(false);
    const handleHoverT = () => {
        setIsHovered(true);
    };
    const handleHoverF = () => {
        setIsHovered(false);
    };
    const clicked = () => {
        setShowList(!showList)
        setPathClicked(path)
    }
    useEffect(() => {
        if (typeof window !== "undefined") {
            createRootFolder();
            setFolderList(listItemInFolder(path))
            if(show !== undefined)
                setShowList(show)
        }
    }, []);
    return (
        <div className={styles.folderBox}>
            <div className={styles.folder } 
            onClick={clicked}
            onMouseEnter={handleHoverT}  
            onMouseLeave={handleHoverF}
            >
                <div className={pathClicked === path ? styles.clicked : styles.nonClicked} >
                    { folderList.length>0 ?
                    <>
                        <>
                            { showList ? 
                                <img src='/images/arrowDown.png' className={styles.folderImg}></img>
                                :  
                                <img src='/images/arrowRight.png' className={styles.folderImg}></img> 
                            }
                            <div className={isHovered ? styles.isActive : null}       
>
                                {path.split('/').pop()}
                            </div>
                        </>
                    </>:
                        <div className={isHovered ? styles.isActive : null} >
                            <div className={styles.paddingName}>
                                {path.split('/').pop()} 
                            </div>
                        </div>
                    }
                </div>
            </div>
            <div className={styles.line}></div>
            <ul className={styles.listUl}>
                {showList ?
                folderList.map((x, index) => (
                    <li key={index} className={styles.folderLi}>
                        <Folders path={path+'/'+x} pathClicked={pathClicked} setPathClicked={setPathClicked}></Folders>
                    </li>
                )) : null
                }
            </ul> 
        </div>
    );
}

export default Folders;
