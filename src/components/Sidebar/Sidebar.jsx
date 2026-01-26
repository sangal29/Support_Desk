import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";

function Sidebar({ isOpen, onClose }) {
  return (
    <aside
      className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}
    >
      <nav className={styles.nav}>
        <NavLink to="/dashboard" onClick={onClose}>
          Dashboard
        </NavLink>
        <NavLink to="/tickets" onClick={onClose}>
          Tickets
        </NavLink>
        <NavLink to="/create-ticket" onClick={onClose}>
          Create Ticket
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;
