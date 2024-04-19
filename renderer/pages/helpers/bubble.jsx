import React, { useState, useEffect } from "react";
import styles from "./bubble.module.css";

const Bubble = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return <div className={styles.bubble}>{message}</div>;
};

export default Bubble;
