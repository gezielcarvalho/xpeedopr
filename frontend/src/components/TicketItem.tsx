import React from "react";

import { Ticket } from "../types";
import { PriorityStatus, PriorityStatusLabels } from "../enums";

import { useTicketStore } from "../stores";

const priorityStyle = {
  [PriorityStatus.LOW]: "text-green-500",
  [PriorityStatus.MEDIUM]: "text-yellow-500",
  [PriorityStatus.HIGH]: "text-red-500",
};

export default function TicketItem({ ticket }: { ticket: Ticket }) {
  const { removeTicket, setEditingTicket, editingTicket } = useTicketStore();
  return (
    <div className="ticket-item">
      <div className={`priority-dot ${priorityStyle[ticket.priority]}`}>
        {PriorityStatusLabels[ticket.priority as PriorityStatus]}
      </div>
      <h2>{ticket.title}</h2>
      <p>{ticket.description}</p>
      <button
        type="button"
        onClick={() =>
          editingTicket?.id !== ticket.id
            ? setEditingTicket(ticket)
            : setEditingTicket(null)
        }
        className="px-4 py-2 bg-yellow-500 text-white rounded"
      >
        {editingTicket?.id !== ticket.id ? "Edit Ticket" : "Cancel Edit"}
      </button>
      {editingTicket?.id !== ticket.id && (
        <button
          disabled={editingTicket?.id == ticket.id}
          className="button"
          onClick={() => removeTicket(ticket)}
        >
          Delete
        </button>
      )}
    </div>
  );
}
