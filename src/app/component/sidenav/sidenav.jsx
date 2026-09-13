"use client"
import styles from "./sidenav.module.css"
import { MdDashboardCustomize } from "react-icons/md";
import { FaGlobe } from "react-icons/fa";
import { IoLogoBuffer } from "react-icons/io5";
import { FaUserCheck } from "react-icons/fa6";
import { IoSettings } from "react-icons/io5";
import { FaSignOutAlt } from "react-icons/fa";
import { RxActivityLog } from "react-icons/rx";
import { useRouter } from "next/navigation";

const SideNav = () => {

    const router = useRouter();
    return (
        <>
        
            <div className={styles.main}>
                <div className={styles.module}>
                
                <div>LoGo</div>
                <div className={styles.dashboard} onClick={() => router.push("/dashboard")}>
                    <div className={styles.icon}><MdDashboardCustomize /></div>
                    <div className={styles.label}>Dashboard</div>
                </div>
                <div className={styles.bills} onClick={() => router.push("/sites")}>
                    <div className={styles.icon} ><FaGlobe /></div>
                    <div className={styles.label}>Sites</div>
                </div>
                <div className={styles.employees}>
                    <div className={styles.icon}><IoLogoBuffer /></div>
                    <div className={styles.label}>Logs</div>
                </div>
                <div className={styles.users}>
                    <div className={styles.icon}><FaUserCheck /></div>
                    <div className={styles.label}>Users</div>
                </div>
                <div className={styles.locations} onClick={() => router.push("/settings")}>
                    <div className={styles.icon} ><IoSettings /></div>
                    <div className={styles.label}>Settings</div>
                </div>
                <div className={styles.activity}>
                    <div className={styles.icon}><RxActivityLog /></div>
                    <div className={styles.label}>Activity Log</div>
                </div>
                </div>
                <div className={styles.logout}>
                     <div><FaSignOutAlt /></div>
                     <div>Logout</div>
                </div>
                   
            </div>
        </>
    )
}

export default SideNav;