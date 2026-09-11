import { MdAddLocationAlt } from "react-icons/md";
import styles from "./addLocationModal.module.css";

const AddLocationModal = ({ onClose }) => {
  return (
    <div>
      <div className={styles.main} onClick={onClose}>
        <div className={styles.card} onClick={(e) => e.stopPropagation()}>
          <div className={styles.header}>
            <div className={styles.icon}>
              <MdAddLocationAlt />
            </div>
            <div className={styles.title}>Add Location</div>
          </div>
          <div className={styles.inputsection}>
            <div className={styles.nameRow}>
              <div className={styles.name}>Name:</div>
              <div className={styles.input}>
                <input />
              </div>
            </div>
          </div>
          <div className={styles.button}>
            <div className={styles.add}>Add</div>
            <div className={styles.cancel} onClick={onClose}>Cancel</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddLocationModal;
