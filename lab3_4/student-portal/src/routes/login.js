import { useState } from "react";
import { hashString } from "react-hash-string";
import { loginStudent } from "../database/service/studentService";
import "./login.scss";


async function login(email, password, setErrorMessage) {
    const loggedStudentId = await loginStudent(email, hashString(password));
    if (loggedStudentId !== null) {
        localStorage.setItem('loggedStudentId', loggedStudentId);
        window.location.href = '/student-ad';
    }
    else {
        setErrorMessage('Invalid credentials');
    }
}


export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    return (
        <div className="login-form-container">
            <div className="login-form-element">
                <label className="input-label">Email: </label>
                <input id="login-email-input" onChange={element => setEmail(element.target.value)}/>
                
            </div>
            <div className="login-form-element">
                <label className="input-label">Hasło: </label>
                <input type="password" id="login-password-input" onChange={element => setPassword(element.target.value)}/>
            </div>
            {errorMessage? <p className="error-p">{errorMessage}</p>: null}
            <div>
                <button className="login-button" onClick={() => login(email, password, setErrorMessage)}>Zaloguj się</button>
            </div>
        </div>
    );
}
