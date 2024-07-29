import React from "react";
import "./styles.css";
import ZustandExample from "./components/ZustandExample";
import TicketForm from "./components/TicketForm";
import { useTicketStore } from "./stores";
import TicketsList from "./components/TicketsList";
import { UserContext } from "./context";

const App: React.FC = () => {
  const { tickets, editingTicket } = useTicketStore();
  return (
    <>
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
