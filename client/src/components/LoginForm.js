import React, { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import "./LoginForm.css";

const LoginForm = () => {
  const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const PASSWORD_REGEX =
    /^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[^\w\s])\S{10,24}$/;

  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [errorMessage, setErrorMessage] = useState("");

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailClicked, setEmailClicked] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordClicked, setPasswordClicked] = useState(false);

  const [isSubmited, setIsSubmited] = useState(false);

  // Checking inputs against regex
  const checkEmail = () => {
    setEmailClicked(true);
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmited(true);
    try {
      if (!EMAIL_REGEX.test(email) || !PASSWORD_REGEX.test(password)) {
        return;
      }
      const response = await axios.post(
        "/api/auth/login",
        {
          email: email,
          password: password,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const accessToken = response.data.accessToken;
      const role = response.data.role;
      const username = response.data.username;
      console.log(username);
      setAuth({ email, username, role, accessToken });
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrorMessage("Brak odpowiedzi serwera.");
      } else if (err.response.status === 400) {
        setErrorMessage("Nieprawidłowe żądanie logowania!");
      } else if (err.response.status === 401) {
        setErrorMessage("Nieprawidłowy login i/lub hasło.");
      } else setErrorMessage("Logowanie nie powiodło się");
    }
  };

  return (
    <div className="container">
      <h2>Logowanie</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            id="email"
            value={email}
            type="text"
            required
            className="login-input"
            onChange={handleEmail}
            onFocus={() => setEmailClicked(false)}
            onBlur={() => {
              checkEmail(email);
            }}
          />
          <span
            className={
              (!validEmail && isSubmited) || (!validEmail && emailClicked)
                ? "warn-bar"
                : "bar"
            }
          ></span>
          <label className="label">Adres e-mail</label>
          <p
            className={
              (emailClicked && !email) ||
              (isSubmited && !email) ||
              (!validEmail && email.length > 0 && emailClicked)
                ? "warn-info"
                : "offscreen"
            }
          >
            {!validEmail && email.length > 0
              ? "Niepoprawny adres e-mail!"
              : "Wpisz adres e-mail!"}
          </p>
        </div>
        <div className="input-group">
          <input
            id="password"
            value={password}
            type="password"
            required
            onChange={handlePassword}
            onFocus={() => setPasswordClicked(false)}
            className="login-input"
            onBlur={() => setPasswordClicked(true)}
          />
          <span
            className={
              (!password && isSubmited) || (!password && passwordClicked)
                ? "warn-bar"
                : "bar"
            }
          ></span>
          <label className="label">Hasło</label>
          <p
            className={
              (passwordClicked && !password) || (isSubmited && !password)
                ? "warn-info"
                : "offscreen"
            }
          >
            Wpisz hasło!
          </p>
        </div>
        <p className={errorMessage ? "warn-note" : "offscreen"}>
          {errorMessage}
        </p>
        <button className="btn" type="submit">
          Zaloguj
        </button>
      </form>
      <p>
        Nie masz jeszcze konta?
        <br />
        <Link to="/signup">Zarejestruj się!</Link>
      </p>
    </div>
  );
};

export default LoginForm;
