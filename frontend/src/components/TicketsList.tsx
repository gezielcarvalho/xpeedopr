import React from "react";
import { Ticket } from "../types";
import { TicketItem } from "./";

export const TicketsList = ({ tickets }: { tickets: Ticket[] }) => {
  return (
    <div className="ticket-list">
      <h1>Tickets List</h1>
      {tickets.length > 0 &&
        tickets.map((ticket) => <TicketItem key={ticket.id} ticket={ticket} />)}
    </div>
  );
};
