import { useEffect, useState } from "react";
import { getTickets } from "../../utils/ticketStorage";
import styles from "./Dashboard.module.css";
import { useAuth } from "../../context/AuthContext";

function Dashboard() {
  const { user } = useAuth();
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const allTickets = getTickets();
    const userTickets = allTickets.filter(
      (t) => t.owner === user.username
    );
    setTickets(userTickets);
  }, [user.username]);

  const totalTickets = tickets.length;

  const statusCount = {
    open: tickets.filter((t) => t.status === "open").length,
    inProgress: tickets.filter((t) => t.status === "in-progress").length,
    resolved: tickets.filter((t) => t.status === "resolved").length,
    closed: tickets.filter((t) => t.status === "closed").length,
  };

  const priorityCount = {
    high: tickets.filter((t) => t.priority === "high").length,
    medium: tickets.filter((t) => t.priority === "medium").length,
    low: tickets.filter((t) => t.priority === "low").length,
  };

  return (
    <div className={styles.dashboard}>
      <h2 className={styles.title}>Dashboard</h2>

      <div className={`${styles.card} ${styles.totalCard}`}>
        <p className={styles.label}>Total Tickets</p>
        <h3 className={styles.value}>{totalTickets}</h3>
      </div>

      <h4 className={styles.sectionTitle}>Priority</h4>
      <div className={styles.cardRow}>
        <div className={styles.card}>
          <p className={styles.label}>High</p>
          <h3 className={styles.value}>{priorityCount.high}</h3>
        </div>
        <div className={styles.card}>
          <p className={styles.label}>Medium</p>
          <h3 className={styles.value}>{priorityCount.medium}</h3>
        </div>
        <div className={styles.card}>
          <p className={styles.label}>Low</p>
          <h3 className={styles.value}>{priorityCount.low}</h3>
        </div>
      </div>

      <h4 className={styles.sectionTitle}>Status</h4>
      <div className={styles.cardRow}>
        <div className={styles.card}>
          <p className={styles.label}>Open</p>
          <h3 className={styles.value}>{statusCount.open}</h3>
        </div>
        <div className={styles.card}>
          <p className={styles.label}>In Progress</p>
          <h3 className={styles.value}>{statusCount.inProgress}</h3>
        </div>
        <div className={styles.card}>
          <p className={styles.label}>Resolved</p>
          <h3 className={styles.value}>{statusCount.resolved}</h3>
        </div>
        <div className={styles.card}>
          <p className={styles.label}>Closed</p>
          <h3 className={styles.value}>{statusCount.closed}</h3>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
