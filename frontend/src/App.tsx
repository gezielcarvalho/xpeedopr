import React from "react";
import "./styles.css";
import { Home, TicketDetails } from "./components";
import { useTicketStore } from "./stores";
import { TicketsList } from "./components";
import { ThemeProvider, UserContext } from "./context";
import { ContextExample } from "./components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App: React.FC = () => {
  const { tickets } = useTicketStore();

  return (
    <>
      <UserContext.Provider value={{ username: "Admin" }}>
        <ThemeProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/tickets"
                element={<TicketsList tickets={tickets} />}
              />
              <Route path="/tickets/:id" element={<TicketDetails />} />
              <Route path="*" element={<div>Not Found</div>} />
            </Routes>
          </Router>
          <ContextExample />
          <ContextExample />
        </ThemeProvider>
      </UserContext.Provider>
    </>
  );
};

export default App;
