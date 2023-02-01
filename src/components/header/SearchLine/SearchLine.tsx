import React from 'react';
import styles from './searchline.module.scss';

export function SearchLine() {
  return (
    <div className={styles.searchLine}>
      <div className={styles.container}>
        <div className={styles.searchLine__content}> 
          <div className={styles.iconsBlock}>
            <span className={styles.iconsBlock__icon + ' ' + styles.redIcon}/>
            <span className={styles.iconsBlock__icon + ' ' + styles.yellowIcon}/>
            <span className={styles.iconsBlock__icon + ' ' + styles.greenIcon}/>
          </div>
          <div className={styles.searchBlock}>
            <h1 className={styles.title}>
              yoldi.agency — тестовое задание
            </h1>
          </div>
        </div>  
      </div>
    </div>
  );
}
