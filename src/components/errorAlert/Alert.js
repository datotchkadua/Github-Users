import React from "react";

const Alert = (props) => {
  return <p className="alert alert-error">{props.errorMsg}</p>;
};

export default Alert;
