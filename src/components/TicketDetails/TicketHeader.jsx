import styles from "./TicketDetails.module.css";

function TicketHeader({ ticket }) {
  return (
    <div className={styles.header}>
      <h2>{ticket.title}</h2>

      <div className={styles.meta}>
        <span className={`${styles.badge} ${styles.status}`}>
          {ticket.status}
        </span>
        <span className={`${styles.badge} ${styles.priority}`}>
          {ticket.priority}
        </span>
      </div>
    </div>
  );
}

export default TicketHeader;
