import { useEffect, useState } from "react";
import { getTickets } from "../utils/ticketStorage";

function Dashboard() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    setTickets(getTickets());
  }, []);

  const totalTickets = tickets.length;

  const statusCount = {
    open: tickets.filter((t) => t.status === "open").length,
    "in-progress": tickets.filter((t) => t.status === "in-progress").length,
    resolved: tickets.filter((t) => t.status === "resolved").length,
    closed: tickets.filter((t) => t.status === "closed").length,
  };

  const priorityCount = {
    high: tickets.filter((t) => t.priority === "high").length,
    medium: tickets.filter((t) => t.priority === "medium").length,
    low: tickets.filter((t) => t.priority === "low").length,
  };

  return (
    <div>
      <h2>Dashboard</h2>

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <div className="card">
          <h4>Total Tickets</h4>
          <p>{totalTickets}</p>
        </div>

        <div className="card">
          <h4>Status</h4>
          <p>Open: {statusCount.open}</p>
          <p>In Progress: {statusCount["in-progress"]}</p>
          <p>Resolved: {statusCount.resolved}</p>
          <p>Closed: {statusCount.closed}</p>
        </div>

        <div className="card">
          <h4>Priority</h4>
          <p>High: {priorityCount.high}</p>
          <p>Medium: {priorityCount.medium}</p>
          <p>Low: {priorityCount.low}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
