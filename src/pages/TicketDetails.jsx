import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTickets, saveTickets } from "../utils/ticketStorage";
import styles from "../components/TicketDetails/TicketDetails.module.css";

function TicketDetails() {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    const tickets = getTickets();
    const found = tickets.find((t) => t.id === Number(id));
    setTicket(found);
  }, [id]);

  const addComment = () => {
    if (!commentText.trim()) return;

    const tickets = getTickets();

    const updatedTickets = tickets.map((t) =>
      t.id === Number(id)
        ? {
            ...t,
            comments: [
              ...t.comments,
              {
                text: commentText,
                createdAt: new Date().toISOString(),
              },
            ],
          }
        : t
    );

    saveTickets(updatedTickets);
    setCommentText("");

    const updatedTicket = updatedTickets.find(
      (t) => t.id === Number(id)
    );
    setTicket(updatedTicket);
  };

  if (!ticket) {
    return <p className={styles.notFound}>Ticket not found</p>;
  }

  return (
    <div className={styles.container}>
      {/* HEADER */}
      <div className={styles.header}>
        <h2>{ticket.title}</h2>
        <div className={styles.meta}>
          <span className={styles.status}>{ticket.status}</span>
          <span className={styles.priority}>{ticket.priority}</span>
        </div>
      </div>

      {/* DESCRIPTION */}
      <div className={styles.section}>
        <h4>Description</h4>
        <p className={styles.description}>{ticket.description}</p>
      </div>

      {/* COMMENTS */}
      <div className={styles.section}>
        <h4>Comments</h4>

        {ticket.comments.length === 0 && (
          <p className={styles.empty}>No comments yet</p>
        )}

        <div className={styles.commentsList}>
          {ticket.comments.map((c, i) => (
            <div key={i} className={styles.commentCard}>
              <p>{c.text}</p>
              <span>
                {new Date(c.createdAt).toLocaleString()}
              </span>
            </div>
          ))}
        </div>

        {/* ADD COMMENT */}
        <textarea
          className={styles.textarea}
          placeholder="Add a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />

        <button className={styles.addBtn} onClick={addComment}>
          Add Comment
        </button>
      </div>
    </div>
  );
}

export default TicketDetails;
