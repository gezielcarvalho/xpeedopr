import React, { useState } from "react";

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

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Ticket Form</h1>
      <div className="space-x-4">
        <button className="px-4 py-2 bg-blue-500 text-white rounded">
          Submit
        </button>
      </div>
    </div>
  );
}
