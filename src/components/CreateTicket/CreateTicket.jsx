import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTickets, saveTickets } from "../../utils/ticketStorage";
import { toast } from "react-toastify";
import styles from "./CreateTicket.module.css";
import { useAuth } from "../../context/AuthContext";

function CreateTicket() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("open");
  const [priority, setPriority] = useState("low");
  const [tags, setTags] = useState("");
  const [assignee, setAssignee] = useState("");
  const [initialComment, setInitialComment] = useState("");

  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  // =========================
  // LOAD TICKET FOR EDIT MODE
  // =========================
  useEffect(() => {
    if (!isEdit) return;

    const tickets = getTickets();

    const ticket = tickets.find(
      (t) => t.id === id && t.owner === user.username
    );

    if (!ticket) {
      toast.error("Unauthorized or ticket not found");
      navigate("/tickets", { replace: true });
      return;
    }

    setTitle(ticket.title);
    setDescription(ticket.description);
    setStatus(ticket.status);
    setPriority(ticket.priority);
    setTags(ticket.tags);
    setAssignee(ticket.assignee);
  }, [id, isEdit, user.username, navigate]);

  // =========================
  // SUBMIT HANDLER
  // =========================
  const handleSubmit = () => {
    if (!title || !description) {
      toast.error("Title and Description are required");
      return;
    }

    const tickets = getTickets();

    if (isEdit) {
      // UPDATE TICKET (OWNER SAFE)
      const updatedTickets = tickets.map((t) =>
        t.id === id && t.owner === user.username
          ? {
              ...t,
              title,
              description,
              status,
              priority,
              tags,
              assignee,
            }
          : t
      );

      saveTickets(updatedTickets);
      toast.success("Ticket updated successfully");
    } else {
      // CREATE TICKET (WITH OWNER)
      const newTicket = {
        id: crypto.randomUUID(),
        title,
        description,
        status,
        priority,
        tags,
        assignee,
        owner: user.username, // ⭐ OWNER ADDED
        createdAt: new Date().toISOString(),
        comments: initialComment
          ? [
              {
                text: initialComment,
                createdAt: new Date().toISOString(),
              },
            ]
          : [],
      };

      saveTickets([...tickets, newTicket]);
      toast.success("Ticket created successfully");
    }

    navigate("/tickets");
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h2 className={styles.title}>
          {isEdit ? "Edit Ticket" : "Create Ticket"}
        </h2>

        <input
          className={styles.input}
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className={styles.textarea}
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className={styles.row}>
          <select
            className={styles.select}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>

          <select
            className={styles.select}
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <input
          className={styles.input}
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

        <input
          className={styles.input}
          placeholder="Assignee"
          value={assignee}
          onChange={(e) => setAssignee(e.target.value)}
        />

        {!isEdit && (
          <textarea
            className={styles.textarea}
            placeholder="Initial comment (optional)"
            value={initialComment}
            onChange={(e) => setInitialComment(e.target.value)}
          />
        )}

        <button className={styles.button} onClick={handleSubmit}>
          {isEdit ? "Update Ticket" : "Create Ticket"}
        </button>
      </div>
    </div>
  );
}

export default CreateTicket;
