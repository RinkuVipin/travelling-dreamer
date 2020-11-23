import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import "./NavLinks.css";

const NavLinks = (props) => {
  const authenticate = useContext(AuthContext);
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          ALL USERS
        </NavLink>
      </li>
      {authenticate.isSignedIn && (
        <li>
          <NavLink to={`/places/user/${authenticate.loggedUser}`}>
            VISITED PLACES
          </NavLink>
        </li>
      )}
      {authenticate.isSignedIn && (
        <li>
          <NavLink to="/places/new">ADD PLACE</NavLink>
        </li>
      )}
      {authenticate.isSignedIn ? (
        <li>
          <NavLink to="/auth">
            <button onClick={authenticate.userSignout}>SIGN OUT</button>
          </NavLink>
        </li>
      ) : (
        <li>
          <NavLink to="/auth">SIGN IN</NavLink>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
