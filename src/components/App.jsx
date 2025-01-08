import React, { useState } from "react";
import FormRss from "./FormRss";
import ThemeContext from "../context/index";
import ListRss from "./ListRss";

const ThemeProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [fids, setFids] = useState([]);

  return (
    <ThemeContext.Provider value={{ items, setItems, fids, setFids }}>
      {children}
    </ThemeContext.Provider>
  );
  // END
};

const App = () => (
  <ThemeProvider>
    <FormRss />
    <ListRss />
  </ThemeProvider>
);

export default App;
