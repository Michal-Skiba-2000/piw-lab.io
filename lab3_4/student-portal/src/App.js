import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getLoggedStudent } from "./database/service/studentService";


// mocking logged user
async function isUserLoggedIn() {
  const student = await getLoggedStudent();
  if (student) {
    return true;
  } else {
    return false;
  }
}


function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const navigateUser = async () => {
      const loggedIn = await isUserLoggedIn();
      if( loggedIn ){
        navigate("/student-ad");
      }
      else{
        navigate("/login");
      }
    }

    navigateUser()
      .catch(console.error);
  }, []);
}


export default App;
