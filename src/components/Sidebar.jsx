import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div
      style={{
        width: "200px",
        borderRight: "1px solid #e5e7eb",
        padding: "20px",
        minHeight: "calc(100vh - 60px)",
      }}
    >
      <nav style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/tickets">Tickets</NavLink>
        <NavLink to="/create-ticket">Create Ticket</NavLink>
      </nav>
    </div>
  );
}

export default Sidebar;
