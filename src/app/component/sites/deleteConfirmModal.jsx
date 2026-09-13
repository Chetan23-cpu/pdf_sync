import { MdWarning } from "react-icons/md";
import styles from "./deleteConfirmModal.module.css";

const DeleteConfirmModal = ({ site, onClose, onConfirm }) => {
  if (!site) return null;

  return (
    <div className={styles.main} onClick={onClose}>
      <div className={styles.card} onClick={(e) => e.stopPropagation()}>
        <div className={styles.icon}>
          <MdWarning />
        </div>
        <div className={styles.title}>Remove this site?</div>
        <div className={styles.message}>
          "{site.name}" will be removed from your sync list. This can't be undone.
        </div>
        <div className={styles.button}>
          <div className={styles.confirm} onClick={() => onConfirm(site.id)}>Delete</div>
          <div className={styles.cancel} onClick={onClose}>Cancel</div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;