import "./App.css";
import Navbar from "./components/Navbar/Navbar";
// import Search from "./components/Search/Search";
import styles from "../src/App.css";

import fetchAdminData from "./components/Api/Api";
import { useEffect, useState } from "react";
import AdminTable from "./components/AdminTable/AdminTable";
import Search from "./components/Search/Search";

function App() {
  const [adminData, setAdminData] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  // SEARCH HANDLER
  const handleSearchFilter = (e) => {
    let inputValue = e.target.value;
    let lowerCase = inputValue.toLowerCase();
    console.log(lowerCase);
    setSearchInput(lowerCase);
  };

  // FETCH DATA
  const generateAdminData = async () => {
    try {
      const data = await fetchAdminData();

      setAdminData(data);
    } catch (error) {
      console.log(error);
    }
  };

  // USE EFFECT
  useEffect(() => {
    generateAdminData();
  }, []);

  // console.log(adminData);

  return (
    <div className="App">
      <Navbar />
      <Search
        handleSearchFilter={handleSearchFilter}
        searchInput={searchInput}
      />
      <AdminTable data={adminData} searchInput={searchInput} />
    </div>
  );
}

export default App;
