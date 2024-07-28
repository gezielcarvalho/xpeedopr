import { create } from "zustand";
import { Ticket } from "../types";

interface State {
  tickets: Ticket[];
  editingTicket: Ticket | null;
  addTicket: (ticket: Ticket) => void;
  removeTicket: (ticket: Ticket) => void;
  updateTicket: (ticket: Ticket) => void;
  setEditingTicket: (ticket: Ticket | null) => void;
}

const useTicketStore = create<State>((set) => ({
  tickets: [] as Ticket[],
  editingTicket: null as Ticket | null,
  addTicket: (ticket: Ticket) =>
    set((state) => ({ tickets: [...state.tickets, ticket] })),
  removeTicket: (ticket: Ticket) =>
    set((state) => ({ tickets: state.tickets.filter((t) => t !== ticket) })),
  updateTicket: (ticket: Ticket) =>
    set((state) => ({
      tickets: state.tickets.map((t) => (t.id === ticket.id ? ticket : t)),
    })),
  setEditingTicket: (ticket: Ticket | null) => set({ editingTicket: ticket }),
}));

export default useTicketStore;
