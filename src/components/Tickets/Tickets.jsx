import { useEffect, useState, useMemo } from "react";
import { getTickets, saveTickets } from "../../utils/ticketStorage";
import { toast } from "react-toastify";
import TicketFilters from "./TicketFilters";
import TicketCard from "./TicketCard";
import Pagination from "./Pagination";
import styles from "./Tickets.module.css";
import { useAuth } from "../../context/AuthContext";

const ITEMS_PER_PAGE = 2;

function Tickets() {
  const { user } = useAuth();

  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);

  // =========================
  // LOAD USER-SCOPED TICKETS
  // =========================
  useEffect(() => {
    const allTickets = getTickets();
    const userTickets = allTickets.filter(
      (t) => t.owner === user.username
    );
    setTickets(userTickets);
  }, [user.username]);

  // =========================
  // DEBOUNCED SEARCH
  // =========================
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  // Reset page on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, statusFilter, priorityFilter]);

  // =========================
  // DELETE (OWNER SAFE)
  // =========================
  const handleDelete = (id) => {
    const allTickets = getTickets();

    const updatedTickets = allTickets.filter(
      (t) => !(t.id === id && t.owner === user.username)
    );

    saveTickets(updatedTickets);

    setTickets((prev) => prev.filter((t) => t.id !== id));

    toast.success("Ticket deleted successfully");
  };

  // =========================
  // FILTER + SORT (MEMOIZED)
  // =========================
  const filteredTickets = useMemo(() => {
    return tickets
      .filter((t) => {
        const textMatch =
          t.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          t.description.toLowerCase().includes(debouncedSearch.toLowerCase());

        return (
          textMatch &&
          (!statusFilter || t.status === statusFilter) &&
          (!priorityFilter || t.priority === priorityFilter)
        );
      })
      .sort((a, b) =>
        sortOrder === "newest"
          ? new Date(b.createdAt) - new Date(a.createdAt)
          : new Date(a.createdAt) - new Date(b.createdAt)
      );
  }, [tickets, debouncedSearch, statusFilter, priorityFilter, sortOrder]);

  const totalPages = Math.ceil(filteredTickets.length / ITEMS_PER_PAGE);

  const paginatedTickets = filteredTickets.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Tickets</h2>

      <TicketFilters
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />

      {paginatedTickets.length === 0 && (
        <p className={styles.empty}>No tickets found</p>
      )}

      {paginatedTickets.map((ticket) => (
        <TicketCard
          key={ticket.id}
          ticket={ticket}
          onDelete={handleDelete}
        />
      ))}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default Tickets;
