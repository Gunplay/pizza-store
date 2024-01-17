import React from 'react';
import styles from './NotFoundBlock.module.scss';



const NotFoundBlock = () => {
  return (
    <div className={styles.root}>
    <h1>
      <span>😔</span>
      <br />
      Not-Found 404
    </h1>
    <p className={styles.description}>Sorry this page is not allowed </p>
    </div>
  );
};

export default NotFoundBlock;
