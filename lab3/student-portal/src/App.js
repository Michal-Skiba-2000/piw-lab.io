import React from "react";
import { useNavigate } from "react-router-dom";
import { loggedStudentIdReference } from "./database/service/studentService";


// mocking logged user
function isUserLoggedIn() {
  localStorage.setItem(loggedStudentIdReference, 1);
  return true;
}


function App() {
  const navigate = useNavigate();
  React.useEffect(() => {
    if( isUserLoggedIn() ){
      navigate("/student-ad");
    }
    else{
      navigate("/login");
    }
  });
}


export default App;
