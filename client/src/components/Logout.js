import { useContext, useEffect } from "react";
import axios from "axios";
import AuthContext from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);
  useEffect(() => {
    const logout = async () => {
      try {
        await axios.post("/api/auth/logout");
        setAuth(null);
        navigate("/");
      } catch (err) {}
    };
    logout();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default Logout;
