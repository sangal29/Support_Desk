import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTickets, saveTickets } from "../utils/ticketStorage";

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
    if (!commentText) return;

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

  if (!ticket) return <p>Ticket not found</p>;

  return (
    <div>
      <h2>{ticket.title}</h2>

      <p>{ticket.description}</p>
      <p>Status: {ticket.status}</p>
      <p>Priority: {ticket.priority}</p>

      <hr />

      <h3>Comments</h3>

      {ticket.comments.length === 0 && <p>No comments yet</p>}

      {ticket.comments.map((c, i) => (
        <div key={i} className="card" style={{ marginBottom: "10px" }}>
          <p>{c.text}</p>
          <small>{new Date(c.createdAt).toLocaleString()}</small>
        </div>
      ))}

      <textarea
        className="input"
        placeholder="Add a comment"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      />

      <button className="btn btn-primary" onClick={addComment}>
        Add Comment
      </button>
    </div>
  );
}

export default TicketDetails;
