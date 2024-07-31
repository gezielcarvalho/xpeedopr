import React from "react";
import { useParams } from "react-router-dom";

export const TicketDetails = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h1>Ticket Details {id}</h1>
    </div>
  );
};
