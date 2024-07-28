import React from "react";
import "./styles.css";
import ZustandExample from "./components/ZustandExample";
import TicketForm from "./components/TicketForm";
import { useTicketStore } from "./stores";

const App: React.FC = () => {
  const { tickets } = useTicketStore();
  return (
    <>
      {tickets.length > 0 &&
        tickets.map((ticket) => (
          <div key={ticket.id}>
            <h2>{ticket.title}</h2>
            <p>{ticket.description}</p>
            <p>{ticket.priority}</p>
          </div>
        ))}
      <TicketForm />
      <ZustandExample />
    </>
  );
};

export default App;
