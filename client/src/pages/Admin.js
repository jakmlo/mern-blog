import React, { useContext, useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import UserList from "../components/UserList";
import AuthContext from "../context/AuthProvider";
import EditForm from "../components/EditForm";
import "./Admin.css";

const AdminPage = () => {
  const [isEdit, setIsEdit] = useState(false);
  const { auth } = useContext(AuthContext);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="wrapper">
      <div className="admin-container">
        <div className="users-container">
          <h3>Użytkownicy:</h3>
          <UserList />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
