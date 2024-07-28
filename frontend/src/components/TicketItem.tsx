import React from "react";

import { Ticket } from "../types";
import { PriorityStatus } from "../enums";

const priorityStyle = {
  [PriorityStatus.LOW]: "text-green-500",
  [PriorityStatus.MEDIUM]: "text-yellow-500",
  [PriorityStatus.HIGH]: "text-red-500",
};

export default function TicketItem({ ticket }: { ticket: Ticket }) {
  return (
    <div className="ticket-item">
      <div className={`priority-dot ${priorityStyle[ticket.priority]}`}></div>
      <h2>{ticket.title}</h2>
      <p>{ticket.description}</p>
      <p>{ticket.priority}</p>
    </div>
  );
}
