import React, { useEffect } from "react";
import "./styles.css";
import { ZustandExample } from "./components";
import { TicketForm } from "./components";
import { useTicketStore } from "./stores";
import { TicketsList } from "./components";
import { ThemeProvider, UserContext } from "./context";
import { ContextExample } from "./components";

const App: React.FC = () => {
  const { tickets, editingTicket, getTickets } = useTicketStore();

  useEffect(() => {
    getTickets();
  }, [getTickets]);

  return (
    <>
      <ThemeProvider>
        <ContextExample />
        <ContextExample />
      </ThemeProvider>
      <UserContext.Provider value={{ username: "Admin" }}>
        <TicketForm editingTicket={editingTicket} />
      </UserContext.Provider>
      <ZustandExample />
      {tickets.length > 0 && <h1>Tickets List</h1> && (
        <TicketsList tickets={tickets} />
      )}
    </>
  );
};

export default App;
