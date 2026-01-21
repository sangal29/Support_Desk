export const getTickets = () => {
  return JSON.parse(localStorage.getItem("tickets")) || [];
};

export const saveTickets = (tickets) => {
  localStorage.setItem("tickets", JSON.stringify(tickets));
};


// store the ticket data in local storage 