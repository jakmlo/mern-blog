import { React, useContext, useState } from "react";
import AuthContext from "../context/AuthProvider";
import { NavLink } from "react-router-dom";

import downArow from "../assets/white-arrow-down.png";
import personIcon from "../assets/person-icon.png";

import "./Nav.css";

const Nav = () => {
  const { auth } = useContext(AuthContext);
  const [isShown, setIsShown] = useState(false);

  const handleMouseEnter = () => {
    setIsShown(true);
  };

  const handleMouseLeave = () => {
    setIsShown(false);
  };

  return (
    <header>
      <ul className="nav__ul">
        <NavLink className="nav__link" to="/">
          Strona główna
        </NavLink>

        {auth ? (
          <>
            {auth.email ? (
              <>
                <li
                  className="nav__item"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <img
                    className="nav__icon"
                    src={personIcon}
                    alt="Ikona osoby"
                  />
                  <span className="nav__username">{auth.username}</span>
                  <img
                    className="nav__icon"
                    src={downArow}
                    alt="Strzałka w dół"
                  />
                </li>
                {isShown && (
                  <ul
                    className="nav__menu"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <NavLink className="nav__menu-link" to="/admin">
                      Admin
                    </NavLink>
                    <NavLink className="nav__menu-link" to="/logout">
                      Wyloguj się
                    </NavLink>
                  </ul>
                )}
              </>
            ) : (
              <></>
            )}
          </>
        ) : (
          <></>
        )}
      </ul>
    </header>
  );
};

export default Nav;
