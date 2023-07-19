import React, { useEffect, useState } from "react";
import axios from "axios";

import { useNavigate, Link } from "react-router-dom";

import "./SignupForm.css";

const SignupForm = () => {
  const USERNAME_REGEX = /[a-zA-z0-9-_]{4,24}$/;
  //eslint-disable-next-line
  const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const PASSWORD_REGEX =
    /^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[^\w\s])\S{10,24}$/;

  // States for registration
  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [usernameClicked, setUsernameClicked] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailClicked, setEmailClicked] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordClicked, setPasswordClicked] = useState(false);

  const [matchPassword, setMatchPassword] = useState("");
  const [validMatchPassword, setValidMatchPassword] = useState(false);
  const [matchPasswordClicked, setMatchPasswordClicked] = useState(false);

  const [passwordNote, setPasswordNote] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [isSubmited, setIsSubmited] = useState(false);

  const navigate = useNavigate();

  // Checking inputs against regex
  useEffect(() => {
    const result = USERNAME_REGEX.test(username);
    setValidUsername(result);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  useEffect(() => {
    const result = PASSWORD_REGEX.test(password);
    setValidPassword(result);
    if (password) {
      const match = password === matchPassword;
      setValidMatchPassword(match);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password, matchPassword, passwordNote]);

  // Password note logic
  useEffect(() => {
    if (password.length < 10) {
      setPasswordNote("Za krótkie hasło.");
    } else if (!/[a-z]/.test(password)) {
      setPasswordNote("Hasło powinno zawierać co najmniej jedną małą literę.");
    } else if (!/[A-Z]/.test(password)) {
      setPasswordNote(
        "Hasło powinno zawierać co najmniej jedną wielką literę."
      );
    } else if (!/[0-9]/.test(password)) {
      setPasswordNote("Hasło powinno zawierać co najmniej jedną cyfrę.");
    } else if (!/[@$!%*?&]/.test(password)) {
      setPasswordNote(
        "Hasło powinno zawierać co najmniej jeden symbol specjalny @$!%*?&."
      );
    } else setPasswordNote("");
  }, [password]);

  // Handling the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmited(true);
    if (
      !USERNAME_REGEX.test(username) ||
      !EMAIL_REGEX.test(email) ||
      !PASSWORD_REGEX.test(password)
    ) {
      return;
    } else {
      try {
        const response = await axios.post("/api/auth/register", {
          username: username,
          email: email,
          password: password,
        });
        if (response.status === 401) {
        }
        setUsername("");
        setEmail("");
        setPassword("");
        setMatchPassword("");

        navigate("/");
      } catch (err) {
        setErrorMessage(err.message);
      }
    }
  };

  return (
    <div className="form">
      <h1>Załóż nowe konto</h1>
      <div className={errorMessage ? "err-msg" : "offscreen"}>
        {errorMessage}
      </div>
      <form>
        <label>Nazwa użytkownika</label>
        <input
          id="username"
          type="text"
          placeholder="Nazwa użytkownika"
          autoComplete="off"
          maxLength="24"
          onChange={(e) => setUsername(e.target.value)}
          onBlur={() => setUsernameClicked(true)}
          className={
            (!validUsername && isSubmited) ||
            (!validUsername && usernameClicked)
              ? "warn-input"
              : "input"
          }
          value={username}
        />

        <p className={!validUsername && username ? "note" : "offscreen"}>
          Nazwa użytkownika powinna zawierać co najmniej 4 znaki, w tym litery
          lub cyfry.
        </p>
        <p
          className={
            (usernameClicked && !username) || (isSubmited && !username)
              ? "warn-note"
              : "offscreen"
          }
        >
          Nazwa użytkownika musi posiadać wartość.
        </p>
        <label>Adres e-mail</label>
        <input
          id="email"
          type="email"
          placeholder="E-mail"
          maxLength="254"
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setEmailClicked(true)}
          className={
            (!validEmail && isSubmited) || (!validEmail && emailClicked)
              ? "warn-input"
              : "input"
          }
          value={email}
        />
        <p className={!validEmail && email ? "note" : "offscreen"}>
          To nie jest poprawny adres e-mail.
        </p>
        <p
          className={
            (emailClicked && !email) || (isSubmited && !email)
              ? "warn-note"
              : "offscreen"
          }
        >
          Adres e-mail musi posiadać wartość.
        </p>
        <label>Hasło</label>
        <input
          id="password"
          type="password"
          placeholder="Hasło"
          maxLength="24"
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() => setPasswordClicked(true)}
          className={
            (!validPassword && isSubmited) ||
            (!validPassword && passwordClicked)
              ? "warn-input"
              : "input"
          }
          value={password}
        />
        <p className={!validPassword && password ? "note" : "offscreen"}>
          {passwordNote}
        </p>
        <p
          className={
            (passwordClicked && !password) || (isSubmited && !password)
              ? "warn-note"
              : "offscreen"
          }
        >
          Hasło musi posiadać wartość.
        </p>
        <label>Potwierdź hasło</label>
        <input
          id="confirm-password"
          type="password"
          placeholder="Potwierdź hasło"
          maxLength="24"
          onChange={(e) => setMatchPassword(e.target.value)}
          onBlur={() => setMatchPasswordClicked(true)}
          className={
            (!matchPassword && isSubmited) ||
            (!validMatchPassword && matchPasswordClicked)
              ? "warn-input"
              : "input"
          }
          value={matchPassword}
        />
        <p
          className={
            !validMatchPassword && matchPassword ? "note" : "offscreen"
          }
        >
          Hasła różnią się od siebie.
        </p>
        <p
          className={
            (!matchPassword && isSubmited) ||
            (matchPasswordClicked && !matchPassword)
              ? "warn-note"
              : "offscreen"
          }
        >
          Hasło musi posiadać wartość.
        </p>

        <button className="btn" onClick={handleSubmit} type="submit">
          Utwórz konto
        </button>
      </form>
      <div>
        Masz już konto?
        <br />
        <Link to="/login">Zaloguj się!</Link>
      </div>
    </div>
  );
};

export default SignupForm;
