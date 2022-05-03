import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { registerStudent } from "../database/service/studentService";
import { hashString } from "react-hash-string";
import "./register.scss";


function getNameValidator(value){
    let isValid = true;
    let errorMsg = "";

    if (value.length === 0) {
        isValid = false;
        errorMsg = 'Imię nie może być puste';
    }

    return {
        value: value,
        isValid: isValid,
        errorMsg: errorMsg
    }
}


function getLastNameValidator(value){
    let isValid = true;
    let errorMsg = "";

    if (value.length === 0) {
        isValid = false;
        errorMsg = 'Nazwisko nie może być puste';
    }

    return {
        value: value,
        isValid: isValid,
        errorMsg: errorMsg
    }
}


function getEmailValidator(value){
    let isValid = true;
    let errorMsg = "";

    if (value.length === 0) {
        isValid = false;
        errorMsg = 'Email nie może być pusty';
    } else if(!value.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        isValid = false;
        errorMsg = 'Niepoprawny format maila';
    }

    return {
        value: value,
        isValid: isValid,
        errorMsg: errorMsg
    }
}


function getPasswordValidator(value){
    let isValid = true;
    let errorMsg = "";

    if (value.length === 0) {
        isValid = false;
        errorMsg = 'Hasło nie może być puste';
    }

    return {
        value: value,
        isValid: isValid,
        errorMsg: errorMsg
    }
}


function getErrorParagrapgh(validator){
    if (!validator.isValid) {
        return <p className="error-p">{validator.errorMsg}</p>
    }
}


function isFormValid(nameValidator, lastNameValidator, emailValidator, passwordValidator){
    return nameValidator.isValid && lastNameValidator.isValid && emailValidator.isValid && passwordValidator.isValid
}


async function submitForm(nameValidator, lastNameValidator, emailValidator, passwordValidator, setNameValidator,
                          setLastNameValidator, setEmailValidator, setPasswordValidator, setShouldReturn) {
    nameValidator = getNameValidator(nameValidator.value);
    setNameValidator(nameValidator);
    lastNameValidator = getLastNameValidator(lastNameValidator.value);
    setLastNameValidator(lastNameValidator);
    emailValidator = getEmailValidator(emailValidator.value);
    setEmailValidator(emailValidator);
    passwordValidator = getPasswordValidator(passwordValidator.value);
    setPasswordValidator(passwordValidator);

    if(!isFormValid(nameValidator, lastNameValidator, emailValidator, passwordValidator)){
        return;
    }

    await registerStudent(nameValidator.value, lastNameValidator.value, emailValidator.value, hashString(passwordValidator.value));
    setShouldReturn(true);
}


export default function Register() {
    const [nameValidator, setNameValidator] = useState({value: "", isValid: true, errorMsg: ""});
    const [lastNameValidator, setLastNameValidator] = useState({value: "", isValid: true, errorMsg: ""});
    const [emailValidator, setEmailValidator] = useState({value: "", isValid: true, errorMsg: ""});
    const [passwordValidator, setPasswordValidator] = useState({value: "", isValid: true, errorMsg: ""});
    const [shouldReturn, setShouldReturn] = useState(false);

    const navigate = useNavigate();
    useEffect(() => {
        if (shouldReturn) navigate("/login");
    });

    return (
        <div className="login-form-container">
            <div className="form-element">
                <label className="input-label">Imię: </label>
                <input id="" name="" onChange={element => setNameValidator(getNameValidator(element.target.value))}/>
                {getErrorParagrapgh(nameValidator)}
            </div>
            <div className="form-element">
                <label className="input-label">Nazwisko: </label>
                <input onChange={element => setLastNameValidator(getLastNameValidator(element.target.value))}/>
                {getErrorParagrapgh(lastNameValidator)}
            </div>
            <div className="form-element">
                <label className="input-label">Email: </label>
                <input onChange={element => setEmailValidator(getEmailValidator(element.target.value))}/>
                {getErrorParagrapgh(emailValidator)}
            </div>
            <div className="form-element">
                <label className="input-label">Hasło: </label>
                <input type="password" onChange={element => setPasswordValidator(getPasswordValidator(element.target.value))}/>
                {getErrorParagrapgh(passwordValidator)}
            </div>
            <div>
                <button className="login-button" onClick={() => submitForm(nameValidator, lastNameValidator, emailValidator, passwordValidator, setNameValidator, setLastNameValidator, setEmailValidator, setPasswordValidator, setShouldReturn)}>Zarejestruj się</button>
            </div>
        </div>
    );
}