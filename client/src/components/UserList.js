import { React, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

import User from "./User";

import "./UserList.css";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();
  const controller = new AbortController();
  //Fetching data
  useEffect(() => {
    let isMounted = true;
    const fetchUsers = async () => {
      try {
        const response = await axiosPrivate.get("/api/users/", {
          signal: controller.signal,
        });
        isMounted && setUsers(response.data);
      } catch (err) {
        console.log(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };
    fetchUsers();

    return () => {
      isMounted = false;
      isMounted && controller.abort();
    };
  }, []);

  const handleDelete = async (id) => {
    await axiosPrivate.delete(`/api/users/${id}`, {
      signal: controller.signal,
    });
    const newUsers = users.filter((user) => user._id !== id);
    setUsers(newUsers);
  };

  const handleEdit = async (id) => {};

  return users.length === 0 ? (
    <p>Brak ministrantów.</p>
  ) : (
    <div className="user-list__container">
      <ul className="user-list__list">
        {users.map((user) => (
          <User
            key={user._id}
            user={user}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        ))}
      </ul>
    </div>
  );
};

export default UserList;
