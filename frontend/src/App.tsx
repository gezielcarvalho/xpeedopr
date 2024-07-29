import React from "react";
import "./styles.css";
import ZustandExample from "./components/ZustandExample";
import TicketForm from "./components/TicketForm";
import { useTicketStore } from "./stores";
import TicketsList from "./components/TicketsList";
import { ThemeProvider, UserContext } from "./context";
import { ContextExample } from "./components/ContextExample";

const App: React.FC = () => {
  const { tickets, editingTicket } = useTicketStore();
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
