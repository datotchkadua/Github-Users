import React, { useState } from "react";
import axios from "axios";
import SearchBar from "../searchbar/SearchBar";

function MainFinder() {
  const [users, setUsers] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [isError, setIsError] = useState(false);

  const fetchData = (user) => {
    if (user.trim().length > 0) {
      axios
        .get(`https://api.github.com/search/users?q=${user}`)
        .then((res) => {
          setUsers([res.data]);
        })
        .catch((err) => {
          setErrorMsg(err.response.data.message);
          setIsError(true);
          setTimeout(() => {
            setIsError(false);
          }, 3000);
        });
    } else {
      setUsers([]);
    }
  };

  return (
    <>
      <SearchBar
        errorMsg={errorMsg}
        isError={isError}
        users={users}
        fetchData={fetchData}
      />
    </>
  );
}

export default MainFinder;
