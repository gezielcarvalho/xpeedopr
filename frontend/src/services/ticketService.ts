import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

const getTickets = async () => {
  // temporarily returining a dummy response
  const response = await api.get("/posts");
  return response.data;
};

const deleteTicket = async (id: string) => {
  // temporarily returining a dummy response
  const response = await api.delete(`/posts/${id}`);
  return response.data;
};

const addTicket = async (ticket: any) => {
  // temporarily returining a dummy response
  const response = await api.post("/posts", ticket);
  return response.data;
};

const updateTicket = async (ticket: any) => {
  // temporarily returining a dummy response
  const response = await api.put(`/posts/${ticket.id}`, ticket);
  return response.data;
};

export { getTickets, deleteTicket, addTicket, updateTicket };
