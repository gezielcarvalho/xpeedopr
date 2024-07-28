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
    set((state) => {
      const finalStateTickets = [...state.tickets, ticket];
      finalStateTickets.sort((a, b) => b.priority - a.priority);
      return { tickets: finalStateTickets };
    }),
  removeTicket: (ticket: Ticket) =>
    set((state) => {
      const finalStateTickets = state.tickets.filter((t) => t !== ticket);
      finalStateTickets.sort((a, b) => b.priority - a.priority);
      return { tickets: finalStateTickets };
    }),
  updateTicket: (ticket: Ticket) =>
    set((state) => {
      const finalStateTickets = state.tickets.map((t) =>
        t.id === ticket.id ? ticket : t
      );
      finalStateTickets.sort((a, b) => b.priority - a.priority);
      return {
        tickets: finalStateTickets,
      };
    }),
  setEditingTicket: (ticket: Ticket | null) => set({ editingTicket: ticket }),
}));

export default useTicketStore;
