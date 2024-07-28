import React, { FormEvent, useState } from "react";

enum PriorityStatus {
  Low = 1,
  Medium = 2,
  High = 3,
}

export default function TicketForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(PriorityStatus.Low);

  const clearForm = () => {
    setTitle("");
    setDescription("");
    setPriority(PriorityStatus.Low);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ title, description, priority });
    clearForm();
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Ticket Form</h1>
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
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(Number(e.target.value))}
          >
            <option value={PriorityStatus.Low}>Low</option>
            <option value={PriorityStatus.Medium}>Medium</option>
            <option value={PriorityStatus.High}>High</option>
          </select>
        </div>
        <button className="px-4 py-2 bg-blue-500 text-white rounded">
          Submit
        </button>
      </form>
    </div>
  );
}
