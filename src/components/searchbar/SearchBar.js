import React from "react";
import Users from "../usersList/UsersList";
import { FaGithub } from "react-icons/fa";
import Alert from "../errorAlert/Alert";

function SearchBar(props) {
  return (
    <section className="section-center">
      <form className="finder-form">
        <div className="icon-center">
          <FaGithub className="github-icon" />
          <h3>Github profile finder</h3>
        </div>
        {props.isError && <Alert errorMsg={props.errorMsg} />}

        <div className="search-div">
          <div className="input-parent">
            <input
              className="form-input"
              placeholder="Search User..."
              type="text"
              onChange={(e) => props.fetchData(e.target.value)}
            />
          </div>
          <Users users={props.users} />
        </div>
      </form>
    </section>
  );
}

export default SearchBar;