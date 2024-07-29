import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

const getTickets = async () => {
  // temporarily returining a dummy response
  const response = await api.get("/posts");
  return response.data;
};

export { getTickets };
