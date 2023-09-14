import React from 'react';
import styles from './pdf.module.css';
function pdf({file}){
    return(
      <div className={styles.text}>
            this is a pdf format editor
            <p>this is a text in pdf: </p>

        </div>
    )
}
export default pdf;