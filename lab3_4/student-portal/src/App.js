import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getLoggedStudent } from "./database/service/studentService";
import { auth } from './firebase/init';
import { useAuthState } from 'react-firebase-hooks/auth';


export const isUserLoggedIn = async (user) => {
  if (user) {
    return true
  }

  const student = await getLoggedStudent();
  if (student) {
    return true;
  }

  return false;
}


function App() {
  const navigate = useNavigate();

  const [user] = useAuthState(auth);

  useEffect(() => {
    const navigateUser = async () => {
      const loggedIn = await isUserLoggedIn(user);
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
