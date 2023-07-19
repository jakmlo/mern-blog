import React from "react";

import "./User.css";

const User = (props) => {
  return (
    <li className="user__item" key={props.user._id}>
      <span>{props.user.username}</span>
      <span>{props.user.email}</span>
      <button
        type="button"
        onClick={() => props.handleDelete(props.user._id)}
        className="user__button--delete"
      >
        Usuń
      </button>
      <button
        type="button"
        onClick={() => props.handleEdit(props.user._id)}
        className="user__button--edit"
      >
        Edytuj
      </button>
    </li>
  );
};

export default User;
