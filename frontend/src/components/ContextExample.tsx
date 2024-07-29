import { useContext } from "react";
import { ThemeContext } from "../context";

export const ContextExample = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div>
      <h1>Context Example</h1>
      <p>Current theme: {theme}</p>
      <button className="button" onClick={toggleTheme}>
        Toggle Theme
      </button>
    </div>
  );
};
