"use client"
import SideNav from "../sidenav/sidenav";
import styles from "./sites.module.css";
import Topnav from "../topnav/topnav";
import { useState, useEffect } from "react";
import AddSitesModal from "./addSitesModal";
import ViewSiteModal from "./viewSiteModal";
import DeleteConfirmModal from "./deleteConfirmModal";
import { MdEditDocument, MdDelete, MdPageview, MdSync } from "react-icons/md";

const Sitespage = () => {
  const [addSiteModal, setAddSiteModal] = useState(false);
  const [editingSite, setEditingSite] = useState(null);
  const [viewingSite, setViewingSite] = useState(null);
  const [deletingSite, setDeletingSite] = useState(null);
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [syncing, setSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState(null);

  const fetchSites = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/sites");
      if (!res.ok) throw new Error("Failed to load sites");
      const data = await res.json();
      setSites(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSites();
  }, []);

  const handleSaveSite = async (site) => {
    setError(null);
    try {
      if (site.id) {
        const res = await fetch(`/api/sites/${site.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(site),
        });
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || `Update failed (${res.status})`);
        }
        setEditingSite(null);
      } else {
        const res = await fetch("/api/sites", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(site),
        });
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || `Create failed (${res.status})`);
        }
        setAddSiteModal(false);
      }
      await fetchSites();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleConfirmDelete = async (id) => {
    setError(null);
    try {
      const res = await fetch(`/api/sites/${id}`, { method: "DELETE" });
      if (!res.ok) {
        throw new Error(`Delete failed (${res.status})`);
      }
      setDeletingSite(null);
      await fetchSites();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSyncNow = async () => {
    setSyncing(true);
    setSyncResult(null);
    setError(null);
    try {
      const res = await fetch("/api/sync");
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error || `Sync failed (${res.status})`);
      }
      setSyncResult(data);
    } catch (err) {
      setError(`Sync error: ${err.message}`);
    } finally {
      setSyncing(false);
    }
  };

  const successCount = syncResult?.results?.filter((r) => r.status === "success").length || 0;
  const failedCount = syncResult?.results?.filter((r) => r.status === "failed").length || 0;

  return (
    <>
      <div className={styles.main}>
        <div>
          <SideNav />
        </div>
        <div className={styles.topnav}>
          <div>
            <Topnav />
          </div>
          <div className={styles.card}>
            <div className={styles.title}>SITES LIST</div>
            <div className={styles.search}>
              <div className={styles.find}>
                <input placeholder="Search here...." />
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <div
                  className={styles.add}
                  onClick={handleSyncNow}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    opacity: syncing ? 0.6 : 1,
                    cursor: syncing ? "not-allowed" : "pointer",
                  }}
                >
                  <MdSync className={syncing ? "spin" : ""} />
                  {syncing ? "Syncing..." : "Sync Now"}
                </div>
                <div className={styles.add} onClick={() => setAddSiteModal(true)}>
                  Add Site
                </div>
              </div>
            </div>

            {error && (
              <div style={{ color: "#ff6b6b", padding: "10px 0" }}>
                Error: {error}
              </div>
            )}

            {syncResult && (
              <div
                style={{
                  color: failedCount > 0 ? "#ffd54f" : "#77dd77",
                  padding: "10px 0",
                  fontSize: "14px",
                }}
              >
                Sync complete: {successCount} succeeded, {failedCount} failed.
                {syncResult.log?.length > 0 && (
                  <details style={{ marginTop: "6px", color: "white", opacity: 0.8 }}>
                    <summary style={{ cursor: "pointer" }}>View log</summary>
                    <pre style={{ whiteSpace: "pre-wrap", fontSize: "12px" }}>
                      {syncResult.log.join("\n")}
                    </pre>
                  </details>
                )}
              </div>
            )}

            {loading ? (
              <div style={{ color: "white", padding: "30px" }}>Loading sites...</div>
            ) : sites.length === 0 ? (
              <div style={{ color: "white", padding: "30px" }}>
                No sites added yet. Click "Add Site" to get started.
              </div>
            ) : (
              <table className={styles.table}>
                <thead>
                  <tr className={styles.tableheading}>
                    <th className={styles.head}>S.No</th>
                    <th className={styles.head}>Site Name</th>
                    <th className={styles.head}>URL</th>
                    <th className={styles.head}>Username</th>
                    <th className={styles.head}>Status</th>
                    <th className={styles.head}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {sites.map((site, index) => (
                    <tr key={site.id} className={styles.tablecontent}>
                      <td className={styles.content}>{index + 1}</td>
                      <td className={styles.content}>{site.name}</td>
                      <td className={styles.content}>
                        <a href={site.url} target="_blank" rel="noopener noreferrer">
                          {site.url}
                        </a>
                      </td>
                      <td className={styles.content}>{site.username}</td>
                      <td className={styles.content}>
                        <span className={styles[site.status]}>{site.status}</span>
                      </td>
                      <td className={styles.action}>
                        <div className={styles.view} onClick={() => setViewingSite(site)}>
                          <MdPageview />
                        </div>
                        <div className={styles.edit} onClick={() => setEditingSite(site)}>
                          <MdEditDocument />
                        </div>
                        <div className={styles.delete} onClick={() => setDeletingSite(site)}>
                          <MdDelete />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {addSiteModal && (
        <AddSitesModal onClose={() => setAddSiteModal(false)} onSave={handleSaveSite} />
      )}

      {editingSite && (
        <AddSitesModal
          onClose={() => setEditingSite(null)}
          onSave={handleSaveSite}
          editingSite={editingSite}
        />
      )}

      {viewingSite && (
        <ViewSiteModal site={viewingSite} onClose={() => setViewingSite(null)} />
      )}

      {deletingSite && (
        <DeleteConfirmModal
          site={deletingSite}
          onClose={() => setDeletingSite(null)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </>
  );
};

export default Sitespage;