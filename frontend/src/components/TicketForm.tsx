import { FormEvent, useContext, useEffect, useState } from "react";
import { useTicketStore } from "../stores";
import { PriorityStatus } from "../enums";
import { Ticket } from "../types";
import { UserContext } from "../context";

interface ITicketFormProps {
  editingTicket: Ticket | null;
}

export const TicketForm = ({ editingTicket }: ITicketFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(PriorityStatus.LOW);

  const { username } = useContext(UserContext);

  const { tickets, addTicket, updateTicket, setEditingTicket } =
    useTicketStore();

  const clearForm = () => {
    setTitle("");
    setDescription("");
    setPriority(PriorityStatus.LOW);
    setEditingTicket(null);
  };

  useEffect(() => {
    if (editingTicket) {
      setTitle(editingTicket.title);
      setDescription(editingTicket.description);
      setPriority(editingTicket.priority);
    } else {
      clearForm();
    }
  }, [editingTicket]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ editingTicket });
    editingTicket
      ? updateTicket({ ...editingTicket, title, description, priority })
      : addTicket({
          id: new Date().toISOString(),
          title,
          description,
          priority,
        });
    clearForm();
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">User: {username}</h1>
      <form onSubmit={handleSubmit} className="ticket-form">
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <fieldset className="priority-fieldset">
            <legend>Priority</legend>

            {Object.entries(PriorityStatus).map(([key, value]) => {
              if (isNaN(Number(key))) {
                return (
                  <label key={key} className="priority-label">
                    <input
                      type="radio"
                      className="priority-input"
                      value={value}
                      checked={priority === value}
                      onChange={() => setPriority(value as PriorityStatus)}
                    />
                    {key}
                  </label>
                );
              }
            })}
          </fieldset>
        </div>
        <button
          type="button"
          onClick={clearForm}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Clear
        </button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded">
          Submit
        </button>
      </form>
    </div>
  );
};
