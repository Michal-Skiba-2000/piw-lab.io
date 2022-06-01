import React from 'react';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getLoggedStudent } from '../../database/service/studentService';
import { auth } from '../../firebase/init';
import { useAuthState } from 'react-firebase-hooks/auth';
import { logout } from '../../firebase/users';
import "./navbar.scss";

async function Logout(user, setLoggedStudent){
  if (user){
    logout();
  }
  else{
    localStorage.removeItem('loggedStudentId');
    setLoggedStudent(null);
  }
}

export default function Navbar() {
  const [currentClicked, setCurrentClicked] = useState(window.location.pathname);
  const [loggedStudent, setLoggedStudent] = useState(null);

  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    const getAndSetLoggedStudent = async () => {
      const student = await getLoggedStudent();
      setLoggedStudent(student);
    }

    getAndSetLoggedStudent()
      .catch(console.error);
  }, []);

  return (
  <div>
  {
    loggedStudent || user ?
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
      <div className="navbar-element">
        <Link
          className="link-element"
          to="/students"
          onClick={() => setCurrentClicked("/students")}
          style={{textDecorationLine: currentClicked === "/students" || currentClicked.includes('/student/')? "underline": "none"}}
        >
            Studenci
        </Link>
      </div>
      <div className="navbar-element-student-info">
          <Link
            className="link-element"
            to="/login"
            onClick={() => Logout(user, setLoggedStudent)}
          >
              Logout
          </Link>
      </div>
      <div className="navbar-element-student-info">
          {loggedStudent? <p>{loggedStudent.name} {loggedStudent.lastName}</p>: null}
          {user? <p>{ user.displayName }</p>: null}
      </div>
    </div>:

    <div className="navbar-container">
      <div className="navbar-element">
        <Link
          className="link-element"
          to="/login"
          onClick={() => setCurrentClicked("/login")}
          style={{textDecorationLine: currentClicked === "/login"? "underline": "none"}}
        >
            Logowanie
        </Link>
      </div>
      <div className="navbar-element">
        <Link
          className="link-element"
          to="/register"
          onClick={() => setCurrentClicked("/register")}
          style={{textDecorationLine: currentClicked === "/register"? "underline": "none"}}
        >
            Rejestracja
        </Link>
      </div>
    </div>
  }
  </div>
  );
}
