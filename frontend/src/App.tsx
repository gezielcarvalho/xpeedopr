import React from "react";
import "./styles.css";
import ZustandExample from "./components/ZustandExample";
import TicketForm from "./components/TicketForm";
import { useTicketStore } from "./stores";
import TicketsList from "./components/TicketsList";

const App: React.FC = () => {
  const { tickets, editingTicket } = useTicketStore();
  return (
    <>
      <TicketForm editingTicket={editingTicket} />
      <ZustandExample />
      {tickets.length > 0 && <h1>Tickets List</h1> && (
        <TicketsList tickets={tickets} />
      )}
    </>
  );
};

export default App;
