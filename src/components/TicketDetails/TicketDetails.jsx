import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTickets, saveTickets } from "../../utils/ticketStorage";
import TicketHeader from "./TicketHeader";
import TicketComments from "./TicketComments";
import styles from "./TicketDetails.module.css";

function TicketDetails() {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    const tickets = getTickets();
    const found = tickets.find((t) => t.id === Number(id));
    setTicket(found);
  }, [id]);

  const addComment = (text) => {
    const tickets = getTickets();

    const updatedTickets = tickets.map((t) =>
      t.id === Number(id)
        ? {
            ...t,
            comments: [
              ...t.comments,
              { text, createdAt: new Date().toISOString() },
            ],
          }
        : t
    );

    saveTickets(updatedTickets);
    setTicket(updatedTickets.find((t) => t.id === Number(id)));
  };

  if (!ticket) {
    return <p className={styles.notFound}>Ticket not found</p>;
  }

  return (
    <div className={styles.container}>
      <TicketHeader ticket={ticket} />

      <div className={styles.section}>
        <h4>Description</h4>
        <p className={styles.description}>{ticket.description}</p>
      </div>

      <TicketComments
        comments={ticket.comments}
        onAddComment={addComment}
      />
    </div>
  );
}

export default TicketDetails;
