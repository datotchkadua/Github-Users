import React from "react";

function Users(props) {
  return (
    <div className="div-margin">
      {props.users.length === 0 || props.users[0]?.message
        ? ""
        : props.users[0]?.items.slice(0, 15).map((item, index) => {
            const { login, avatar_url } = item;
            return (
              <div key={index}>
                <a
                  className="link-section"
                  key={index}
                  href={`https://github.com/${login}`}
                >
                  <div>
                    <img className="user-img" src={avatar_url} alt="user" />
                  </div>
                  <div style={{ marginLeft: "10px" }}>{login}</div>
                </a>
              </div>
            );
          })}
    </div>
  );
}

export default Users;
