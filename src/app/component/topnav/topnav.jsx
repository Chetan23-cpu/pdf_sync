import { FaUser } from "react-icons/fa6";
import { IoIosNotifications } from "react-icons/io";
import styles from "./topnav.module.css";
const Topnav = () => {
  return (
    <div>
      <div className={styles.main}>
        <div>
          <div className={styles.content}>
            <IoIosNotifications />
            <FaUser />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topnav;
