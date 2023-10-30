import "./App.css";
import { useState } from "react";
import Header from "./components/Header";
import Todos from "./components/Todos";

const App: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [selectOption, setSelectOption] = useState<string>("all");

  return (
    <div className="app">
      <Header
        search={search}
        setSearch={setSearch}
        setSelectOption={setSelectOption}
      />
      <Todos searchInput={search} selectOption={selectOption} />
    </div>
  );
};

export default App;
