import "../styles/header.css";
import { useEffect, useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

interface IHeader {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  search: string;
  setSelectOption: React.Dispatch<React.SetStateAction<string>>;
}

const Header: React.FC<IHeader> = ({ setSearch, search, setSelectOption }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    JSON.parse(localStorage.getItem("bgtodo-darkmode")!) || false
  );

  useEffect(() => {
    localStorage.setItem("bgtodo-darkmode", JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }
  }, [isDarkMode]);

  return (
    <header>
      <h2>TODO LIST</h2>

      <div className="nav">
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Search note..."
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <span>
            <RiSearchLine />
          </span>
        </form>

        <div>
          <select onChange={(e) => setSelectOption(e.target.value)}>
            <option value="all">All</option>
            <option value="complete">Complete</option>
            <option value="inomplete">Inomplete</option>
          </select>

          <div
            className="toggle-mode"
            onClick={() => setIsDarkMode(!isDarkMode)}
          >
            {isDarkMode ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
