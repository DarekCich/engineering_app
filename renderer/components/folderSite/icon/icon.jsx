import React from 'react'
import styles from './icon.module.css'
function Icon({name}){
  const skrot = name.split('.').pop()
  let x;
  if (skrot == 'txt')
    x = '/images/textFile.png'
  else 
    x = '/images/file.png' 
  return(
    <img src={x} className={styles.reverse}></img>
  )
}

export default Icon;