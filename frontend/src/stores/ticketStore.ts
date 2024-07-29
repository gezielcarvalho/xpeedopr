import { create } from "zustand";
import { Ticket } from "../types";

interface State {
  tickets: Ticket[];
  editingTicket: Ticket | null;
  addTicket: (ticket: Ticket) => void;
  removeTicket: (ticket: Ticket) => void;
  updateTicket: (ticket: Ticket) => void;
  setEditingTicket: (ticket: Ticket | null) => void;
  loading: boolean;
  error: string | null;
  fetchData: () => Promise<void>;
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
  loading: false,
  error: null,
  fetchData: async () => {
    set({ loading: true, error: null });
    try {
      // temporarily returining a dummy response
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const data = await response.json();
      set(() => {
        console.log({ data });
        return { tickets: [], loading: false };
      });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
}));

export { useTicketStore };
