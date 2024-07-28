import React from "react";
import "./styles.css";
import ZustandExample from "./components/ZustandExample";
import TicketForm from "./components/TicketForm";

const App: React.FC = () => {
  return (
    <>
      <TicketForm />
      <ZustandExample />
    </>
  );
};

export default App;
