import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./Tickets.module.css";

function TicketCard({ ticket, onDelete }) {
  const navigate = useNavigate();

  const confirmDelete = (e) => {
    e.stopPropagation();
    toast(
      ({ closeToast }) => (
        <div>
          <p>Are you sure you want to delete this ticket?</p>
          <div className={styles.toastActions}>
            <button
              className={styles.dangerBtn}
              onClick={() => {
                onDelete(ticket.id);
                closeToast();
              }}
            >
              Delete
            </button>
            <button className={styles.secondaryBtn} onClick={closeToast}>
              Cancel
            </button>
          </div>
        </div>
      ),
      { autoClose: false }
    );
  };

  return (
    <div
      className={styles.ticketCard}
      onClick={() => navigate(`/tickets/${ticket.id}`)}
    >
      <div className={styles.cardHeader}>
        <h4>{ticket.title}</h4>
        <span>{new Date(ticket.createdAt).toLocaleDateString()}</span>
      </div>

      <p className={styles.description}>{ticket.description}</p>

      <div className={styles.meta}>
        <span>Status: {ticket.status}</span>
        <span>Priority: {ticket.priority}</span>
      </div>

      <div className={styles.actions}>
        <button
          className={styles.primaryBtn}
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/tickets/edit/${ticket.id}`);
          }}
        >
          Edit
        </button>

        <button className={styles.dangerBtn} onClick={confirmDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default TicketCard;
