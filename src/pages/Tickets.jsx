import { useEffect, useState } from "react";
import { getTickets, saveTickets } from "../utils/ticketStorage";
import { Link, useNavigate } from "react-router-dom";

const ITEMS_PER_PAGE = 2;

function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  // Load tickets
  useEffect(() => {
    setTickets(getTickets());
  }, []);

  // 🔁 Debounce search (500ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  // Reset page when filters/search change
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, statusFilter, priorityFilter]);

  const handleDelete = (id) => {
    if (!window.confirm("Delete this ticket?")) return;

    const updated = tickets.filter((t) => t.id !== id);
    saveTickets(updated);
    setTickets(updated);
  };

  // 🔍 Search + Filter + Sort
  const filteredTickets = tickets
    .filter((t) => {
      const textMatch =
        t.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        t.description.toLowerCase().includes(debouncedSearch.toLowerCase());

      const statusMatch = !statusFilter || t.status === statusFilter;
      const priorityMatch = !priorityFilter || t.priority === priorityFilter;

      return textMatch && statusMatch && priorityMatch;
    })
    .sort((a, b) => {
      return sortOrder === "newest"
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt);
    });

  // 📄 Pagination logic
  const totalPages = Math.ceil(filteredTickets.length / ITEMS_PER_PAGE);

  const paginatedTickets = filteredTickets.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div>
      <h2>Tickets</h2>

      {/* SEARCH */}
      <input
        className="input"
        placeholder="Search by title or description"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* FILTERS */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
        <select
          className="input"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="open">Open</option>
          <option value="in-progress">In Progress</option>
          <option value="resolved">Resolved</option>
          <option value="closed">Closed</option>
        </select>

        <select
          className="input"
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
        >
          <option value="">All Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <select
          className="input"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      {paginatedTickets.length === 0 && <p>No tickets found</p>}

      {paginatedTickets.map((ticket) => (
        <div key={ticket.id} className="card" style={{ marginBottom: "10px" }}>
          <h4>
            <Link to={`/tickets/${ticket.id}`}>{ticket.title}</Link>
          </h4>

          <p>{ticket.description}</p>
          <p>Status: {ticket.status}</p>
          <p>Priority: {ticket.priority}</p>
          <p>
            Created: {new Date(ticket.createdAt).toLocaleString()}
          </p>

          <button
            className="btn btn-primary"
            onClick={() => navigate(`/tickets/edit/${ticket.id}`)}
          >
            Edit
          </button>

          <button
            className="btn btn-danger"
            onClick={() => handleDelete(ticket.id)}
            style={{ marginLeft: "10px" }}
          >
            Delete
          </button>
        </div>
      ))}

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div style={{ marginTop: "20px" }}>
          <button
            className="btn"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Prev
          </button>

          <span style={{ margin: "0 10px" }}>
            Page {currentPage} of {totalPages}
          </span>

          <button
            className="btn"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Tickets;
