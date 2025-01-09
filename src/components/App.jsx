import React, { useState } from "react";
import FormRss from "./FormRss";
import ThemeContext from "../context/index";
import ListRss from "./ListRss";
import ModalWindow from "./ModalWindow"

const ThemeProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [fids, setFids] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null); 

  return (
    <ThemeContext.Provider value={{ items, setItems, fids, setFids, selectedItem, setSelectedItem }}>
      {children}
    </ThemeContext.Provider>
  );
  // END
};

const App = () => (
  <ThemeProvider>
    <ModalWindow/>
    <main className="flex-grow-1">
      <FormRss />
      <ListRss />
    </main>
  </ThemeProvider>
);
export default App;
