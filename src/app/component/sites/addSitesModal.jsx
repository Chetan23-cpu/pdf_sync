import { useState, useEffect } from "react";
import { MdAddLocationAlt } from "react-icons/md";
import styles from "./addSitesModal.module.css";

const AddSitesModal = ({ onClose, onSave, editingSite }) => {
  const isEditMode = !!editingSite;

  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [username, setUsername] = useState("");
  const [appPassword, setAppPassword] = useState("");

  useEffect(() => {
    if (editingSite) {
      setName(editingSite.name || "");
      setUrl(editingSite.url || "");
      setUsername(editingSite.username || "");
      setAppPassword(editingSite.appPassword || "");
    }
  }, [editingSite]);

  const handleAdd = () => {
    if (!name || !url || !username) return;
    onSave({
      ...(isEditMode ? { id: editingSite.id } : {}),
      name,
      url,
      username,
      appPassword,
      status: editingSite?.status || "connected",
    });
  };

  return (
    <div>
      <div className={styles.main} onClick={onClose}>
        <div className={styles.card} onClick={(e) => e.stopPropagation()}>
          <div className={styles.header}>
            <div className={styles.icon}>
              <MdAddLocationAlt />
            </div>
            <div className={styles.title}>
              {isEditMode ? "Edit WordPress Site" : "Add WordPress Site"}
            </div>
          </div>
          <div className={styles.inputsection}>
            <div className={styles.nameRow}>
              <div className={styles.name}>Site Name:</div>
              <div className={styles.input}>
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Water Plus" />
              </div>
            </div>
            <div className={styles.nameRow}>
              <div className={styles.name}>Site URL:</div>
              <div className={styles.input}>
                <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://yoursite.com" />
              </div>
            </div>
            <div className={styles.nameRow}>
              <div className={styles.name}>Username:</div>
              <div className={styles.input}>
                <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="WordPress username or email" />
              </div>
            </div>
            <div className={styles.nameRow}>
              <div className={styles.name}>App Password:</div>
              <div className={styles.input}>
                <input
                  type="password"
                  value={appPassword}
                  onChange={(e) => setAppPassword(e.target.value)}
                  placeholder={isEditMode ? "Leave blank to keep current" : "xxxx xxxx xxxx xxxx"}
                />
              </div>
            </div>
          </div>
          <div className={styles.button}>
            <div className={styles.add} onClick={handleAdd}>
              {isEditMode ? "Update" : "Add"}
            </div>
            <div className={styles.cancel} onClick={onClose}>Cancel</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSitesModal;