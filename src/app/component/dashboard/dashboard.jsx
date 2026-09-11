import SideNav from "../sidenav/sidenav";
import styles from "./dashboard.module.css";
import Topnav from "../topnav/topnav";
const Dashboardcomp = () => {
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
          <div>Dashboard</div>
        </div>
      </div>
    </>
  );
};

export default Dashboardcomp;
