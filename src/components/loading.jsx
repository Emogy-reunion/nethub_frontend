'use client'

import styles from '@/styles/Loading.module.css';

export default function Loading({ text = 'Loading...' }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.spinner}></div>
      <p className={styles.text}>{text}</p>
    </div>
  );
}

