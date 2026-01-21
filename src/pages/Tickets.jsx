import { useEffect, useState, useRef, useMemo } from "react";
import { getTickets, saveTickets } from "../utils/ticketStorage";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
  const hasShownNoResultToast = useRef(false);

  // Load tickets on mount
  useEffect(() => {
    setTickets(getTickets());
  }, []);

  // debouncing search funcnality 
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

  // Handle ticket deletion
  const handleConfirmedDelete = (id) => {
    const updated = tickets.filter((t) => t.id !== id);
    saveTickets(updated);
    setTickets(updated);
    toast.success("Ticket deleted successfully");
  };

  //  adding a confirmation before deleting a ticket
  const confirmDelete = (id) => {
    toast(
      ({ closeToast }) => (
        <div>
          <p>Are you sure you want to delete this ticket?</p>
          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <button
              className="btn btn-danger"
              onClick={() => {
                handleConfirmedDelete(id);
                closeToast();
              }}
            >
              Delete
            </button>
            <button className="btn" onClick={closeToast}>
              Cancel
            </button>
          </div>
        </div>
      ),
      { autoClose: false }
    );
  };

  // Filtering and sorting tickets
  const filteredTickets = useMemo(() => {
    return tickets
      .filter((t) => {
        const textMatch =
          t.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          t.description.toLowerCase().includes(debouncedSearch.toLowerCase());

        const statusMatch = !statusFilter || t.status === statusFilter;
        const priorityMatch = !priorityFilter || t.priority === priorityFilter;

        return textMatch && statusMatch && priorityMatch;
      })
      .sort((a, b) =>
        sortOrder === "newest"
          ? new Date(b.createdAt) - new Date(a.createdAt)
          : new Date(a.createdAt) - new Date(b.createdAt)
      );
  }, [tickets, debouncedSearch, statusFilter, priorityFilter, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(filteredTickets.length / ITEMS_PER_PAGE);

  const paginatedTickets = useMemo(() => {
    return filteredTickets.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    );
  }, [filteredTickets, currentPage]);

  // Toast when no results found 
  useEffect(() => {
    if (paginatedTickets.length === 0 && tickets.length > 0) {
      if (!hasShownNoResultToast.current) {
        toast.info("No tickets match your search or filters");
        hasShownNoResultToast.current = true;
      }
    } else {
      hasShownNoResultToast.current = false;
    }
  }, [paginatedTickets, tickets]);

  return (
    <div className="tickets-container">
      <h2>Tickets</h2>

      {/* SEARCH */}
      <input
        className="input"
        placeholder="Search by title or description"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* FILTERS */}
      <div className="filters">
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
        <div
          key={ticket.id}
          className="card"
          style={{ marginBottom: "10px", cursor: "pointer" }}
          onClick={() => navigate(`/tickets/${ticket.id}`)}
        >
          <h4>{ticket.title}</h4>

          <p>{ticket.description}</p>
          <p>Status: {ticket.status}</p>
          <p>Priority: {ticket.priority}</p>
          <p>Created: {new Date(ticket.createdAt).toLocaleString()}</p>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <button
              className="btn btn-primary"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/tickets/edit/${ticket.id}`);
              }}
            >
              Edit
            </button>

            <button
              className="btn btn-danger"
              onClick={(e) => {
                e.stopPropagation();
                confirmDelete(ticket.id);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="pagination" style={{ marginTop: "20px" }}>
          <button
            className="btn"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Prev
          </button>

          <span>
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
