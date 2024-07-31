import React, { useEffect } from "react";
import { Ticket } from "../types";
import { TicketForm, TicketItem } from "./";
import { useTicketStore } from "../stores";

export const TicketsList = ({ tickets }: { tickets: Ticket[] }) => {
  const { editingTicket, getTickets } = useTicketStore();

  useEffect(() => {
    getTickets();
  }, [getTickets]);

  return (
    <div className="ticket-list">
      <h1>Tickets List</h1>
      <TicketForm editingTicket={editingTicket} />
      {tickets.length > 0 &&
        tickets.map((ticket) => <TicketItem key={ticket.id} ticket={ticket} />)}
    </div>
  );
};
