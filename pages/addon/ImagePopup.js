import React from "react";
import styles from "@/styles/ImagePopup.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
const ImagePopup = ({ imageUrl, onClose }) => {
  return (
    <div className={styles.popup}>
      <div className={styles.popupInner}>
        <img src={imageUrl} alt="Popup Image" className={styles.popupImage} />
        <button onClick={onClose} className={styles.closeButton}>
          <FontAwesomeIcon size="2x" icon={faXmark} />
        </button>
      </div>
    </div>
  );
};

export default ImagePopup;