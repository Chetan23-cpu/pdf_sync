import { MdVisibility } from "react-icons/md";
import styles from "./viewSiteModal.module.css";

const STATUS_LABEL = {
  connected: "Connected",
  unauthorized: "Needs Re-auth",
  unreachable: "Unreachable",
};

const ViewSiteModal = ({ site, onClose }) => {
  if (!site) return null;

  return (
    <div className={styles.main} onClick={onClose}>
      <div className={styles.card} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div className={styles.icon}>
            <MdVisibility />
          </div>
          <div className={styles.title}>Site Details</div>
        </div>
        <div className={styles.detailsSection}>
          <div className={styles.row}>
            <div className={styles.label}>Site Name:</div>
            <div className={styles.value}>{site.name}</div>
          </div>
          <div className={styles.row}>
            <div className={styles.label}>Site URL:</div>
            <div className={styles.value}>
              <a href={site.url} target="_blank" rel="noopener noreferrer">
                {site.url}
              </a>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.label}>Username:</div>
            <div className={styles.value}>{site.username}</div>
          </div>
          <div className={styles.row}>
            <div className={styles.label}>Status:</div>
            <div className={`${styles.value} ${styles[site.status]}`}>
              {STATUS_LABEL[site.status] || site.status}
            </div>
          </div>
        </div>
        <div className={styles.button}>
          <div className={styles.close} onClick={onClose}>Close</div>
        </div>
      </div>
    </div>
  );
};

export default ViewSiteModal;