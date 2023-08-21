import React, { useEffect, useRef, useState } from 'react';
import { folderListOfFolders, folderCreateRoot, folderRename } from '../../../../main/backend/folderMenager';
import styles from './folderList.module.css'
function Folders({ path,show, pathClicked, setPathClicked, reload }) {
    const [showSelf,          setShowSelf] = useState(false)
    const [folderList,      setFolderList] = useState([]);
    const [showList,          setShowList] = useState(false);
    const [isHovered,        setIsHovered] = useState(false);
    const [rename,              setRename] = useState(false);
    const [newName,            setNewName] = useState(path.split('/').pop())
    const handleHoverT = () => {
        setIsHovered(true);
    };
    const handleHoverF = () => {
        setIsHovered(false);
    };
    const clicked = () => {
        setShowList(!showList)
        setPathClicked(path)
        setFolderList(folderListOfFolders(path))
        setNewName(path.split('/').pop())
    }
    const changeValue = (val)=>{
        const value = val.target.value
        if (value.length <15){
            setNewName(value)
        }
    }
    const handleKeyDown = (event) => {
        if (   event.key    === 'Enter' 
            && pathClicked  === path 
            && rename) {
                setRename(false)
                folderRename(path,newName)
        }
    };
    useEffect(() => {
        if (typeof window !== "undefined") {
            folderCreateRoot();
            const tmp = folderListOfFolders(path)
            if (tmp[0] === -1){
                return
            }
            setShowSelf(true)
            setFolderList(folderListOfFolders(path))
            if(show !== undefined)
                setShowList(show)
        }
    }, []);   
    useEffect(() => {
        if(pathClicked!==path && rename){
            setRename(false)
            folderRename(path,newName)
        }
            
    }, [pathClicked]);

    useEffect(() => {
        setFolderList(folderListOfFolders(path));
    }, [reload]);
    if (showSelf)
        return (
            <div className={styles.folderBox}>
                <div className={styles.folder } 
                onClick={clicked}
                onMouseEnter={handleHoverT}  
                onMouseLeave={handleHoverF}
                >
                    <div className={pathClicked === path ? styles.clicked : styles.nonClicked} >
                        { showList ? 
                            <img src='/images/arrowDown.png' className={styles.folderImg}></img>
                            :  
                            <img src='/images/arrowRight.png' className={styles.folderImg}></img> 
                        }
                        <div className={isHovered ? styles.isActive : null} onDoubleClick={()=>{setRename(true)}}>
                            {
                                rename && pathClicked === path ?   
                                <div >
                                    <input type='text' value={newName} 
                                    onChange={(val)=>{changeValue(val)}} 
                                    onKeyDown={handleKeyDown}></input>
                                </div> 
                                :
                                path.split('/').pop()
                            }
                            
                        </div>
                    </div>
                </div>
                <div className={styles.line}></div>
                <ul className={styles.listUl}>
                    { showList  ?
                        folderList.map((x, index) => (
                        <li key={index} className={styles.folderLi}>
                            <Folders path={path + '/' + x} pathClicked={pathClicked} setPathClicked={setPathClicked} reload={reload}></Folders>
                        </li>
                        )) 
                        : 
                        null
                    }
                </ul> 
            </div>
        );
    else
    return null
}

export default Folders;
