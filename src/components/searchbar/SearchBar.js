import React, { useEffect, useState } from "react";
import axios from "axios";
import Users from "../usersList/UsersList";
import { FaGithub } from "react-icons/fa";
import Alert from "../errorAlert/Alert";

function SearchBar(props) {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    const controller = new AbortController();
    let timeoutId;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        if (user.trim().length > 0) {
          const res = await axios.get(
            `https://api.github.com/search/users?q=${user}`,
            {
              signal: controller.signal,
            }
          );

          setUsers(res.data.items);
        } else {
          setUsers([]);
        }
      } catch (err) {
        if (err.name !== "CanceledError") {
          
          setErrorMsg(err.response.data?.message || err?.message);
          setIsError(true);
          timeoutId = setTimeout(() => {
            setIsError(false);
          }, 4000);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [user]);

  return (
    <section className="section-center">
      <form className="finder-form">
        <div className="icon-center">
          <FaGithub className="github-icon" />
          <h3>Github profile finder</h3>
        </div>
        {isError && <Alert errorMsg={errorMsg} />}

        <div className="search-div">
          <div className="input-parent">
            <input
              className="form-input"
              placeholder="Search User..."
              type="text"
              onChange={(e) => setUser(e.target.value)}
            />
          </div>
          {isLoading ? (
            <p className="loader">Loading...</p>
          ) : (
            <Users users={users} />
          )}
        </div>
      </form>
    </section>
  );
}

export default SearchBar;
