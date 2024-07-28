import { FormEvent, useState } from "react";
import { useTicketStore } from "../stores";
import { PriorityStatus } from "../enums";

export default function TicketForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(PriorityStatus.Low);

  const { tickets, addTicket } = useTicketStore();

  const clearForm = () => {
    setTitle("");
    setDescription("");
    setPriority(PriorityStatus.Low);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ title, description, priority });
    addTicket({
      id: new Date().toISOString(),
      title,
      description,
      priority: priority as PriorityStatus,
    });
    clearForm();
  };

  const ticketData = {
    id: new Date().toISOString(),
    title,
    description,
    priority,
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Ticket Form: {tickets.length}</h1>
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
        <button className="px-4 py-2 bg-blue-500 text-white rounded">
          Submit
        </button>
      </form>
    </div>
  );
}
