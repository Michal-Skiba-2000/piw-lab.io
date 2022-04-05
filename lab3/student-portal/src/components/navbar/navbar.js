import React from 'react';
import { useState } from "react";
import { Link } from "react-router-dom";
import { getLoggedStudent } from '../../database/service/studentService';
import "./navbar.scss";

export default function Navbar() {
  const [currentClicked, setCurrentClicked] = useState(window.location.pathname);
  const [loggedStudent] = useState(getLoggedStudent());

  return (
  <div className="navbar-container">
    <div className="navbar-element">
      <Link
        className="link-element"
        to="/student-ad"
        onClick={() => setCurrentClicked("/student-ad")}
        style={{textDecorationLine: currentClicked === "/student-ad"? "underline": "none"}}
      >
          Ogłoszenia studentów
      </Link>
    </div>
    <div className="navbar-element">
      <Link
        className="link-element"
        to="/group-ad"
        onClick={() => setCurrentClicked("/group-ad")}
        style={{textDecorationLine: currentClicked === "/group-ad"? "underline": "none"}}
      >
          Poszukiwania do grupy
      </Link>
    </div>
    <div className="navbar-element-student-info">
      {loggedStudent.name} {loggedStudent.lastName}
    </div>
  </div>
  );
}
