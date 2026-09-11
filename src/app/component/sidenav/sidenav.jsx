"use client"
import styles from "./sidenav.module.css"
import { MdDashboardCustomize } from "react-icons/md";
import { FaMoneyBills } from "react-icons/fa6";
import { FaUserAlt } from "react-icons/fa";
import { FaUserCheck } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { TiLocationArrow } from "react-icons/ti";
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
                <div className={styles.dashboard}>
                    <div className={styles.icon}><MdDashboardCustomize /></div>
                    <div className={styles.label}>Dashboard</div>
                </div>
                <div className={styles.bills}>
                    <div className={styles.icon}><FaMoneyBills /></div>
                    <div className={styles.label}>Bills</div>
                </div>
                <div className={styles.employees}>
                    <div className={styles.icon}><FaUserAlt /></div>
                    <div className={styles.label}>Employees</div>
                </div>
                <div className={styles.users}>
                    <div className={styles.icon}><FaUserCheck /></div>
                    <div className={styles.label}>Users</div>
                </div>
                <div className={styles.locations} onClick={() => router.push("/location")}>
                    <div className={styles.icon} ><FaLocationDot /></div>
                    <div className={styles.label}>Locations</div>
                </div>
                <div className={styles.divisions}>
                    <div className={styles.icon}><TiLocationArrow /></div>
                    <div className={styles.label}>Divisions</div>
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