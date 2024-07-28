import { create } from "zustand";

interface State {
  tickets: Ticket[];
  addTicket: (ticket: Ticket) => void;
  removeTicket: (ticket: Ticket) => void;
}

interface Ticket {
  id: string;
  title: string;
  description: string;
  priority: string;
}

const useTicketStore = create<State>((set) => ({
  tickets: [] as Ticket[],
  addTicket: (ticket: Ticket) =>
    set((state) => ({ tickets: [...state.tickets, ticket] })),
  removeTicket: (ticket: Ticket) =>
    set((state) => ({ tickets: state.tickets.filter((t) => t !== ticket) })),
  updateTicket: (ticket: Ticket) =>
    set((state) => ({
      tickets: state.tickets.map((t) => (t.id === ticket.id ? ticket : t)),
    })),
}));

export default useTicketStore;
