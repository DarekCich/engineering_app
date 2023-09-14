import React from 'react'
import styles from './icon.module.css'
import { formatImages } from '../../../public/images/fileIcons/formatImages';
function Icon({name}){
  const skrot = name.split('.').pop()
  let x;
  if (formatImages.includes(skrot))
    x = `/images/fileIcons/${skrot}.png`
  else 
    x = '/images/fileIcons/file.png' 
  return(
    <img src={x} className={styles.reverse}></img>
  )
}

export default Icon;