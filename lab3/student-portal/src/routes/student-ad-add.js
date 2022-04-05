import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./student-ad-add.scss";
import { createStudentAd } from "../database/service/studentAdService";


function getDescriptionValidator(value){
    let isValid = true;
    let errorMsg = "";

    if (value.length === 0) {
        isValid = false;
        errorMsg = 'Opis nie może być pusty';
    }

    return {
        value: value,
        isValid: isValid,
        errorMsg: errorMsg
    }
}

function getSubjectValidator(value){
    let isValid = true;
    let errorMsg = "";

    if (value.length === 0) {
        isValid = false;
        errorMsg = 'Nazwa przedmiotu nie może być pusta';
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

function isFormValid(descriptionValidator, subjectValidator){
    return descriptionValidator.isValid && subjectValidator.isValid
}

function submitForm(descriptionValidator, setDescriptionValidator, subjectValidator, setSubjectValidator, tags, setShouldReturn) {
    descriptionValidator = getDescriptionValidator(descriptionValidator.value)
    setDescriptionValidator(descriptionValidator);
    subjectValidator = getSubjectValidator(subjectValidator.value);
    setSubjectValidator(subjectValidator);

    if(!isFormValid(descriptionValidator, subjectValidator)){
        return;
    }

    createStudentAd(descriptionValidator.value, tags.trim().split(' '), subjectValidator.value);
    setShouldReturn(true);
}

export default function StudentAdAdd() {
    const [descriptionValidator, setDescriptionValidator] = useState({value: "", isValid: true, errorMsg: ""});
    const [subjectValidator, setSubjectValidator] = useState({value: "", isValid: true, errorMsg: ""});
    const [tags, setTags] = useState("");
    const [shouldReturn, setShouldReturn] = useState(false);

    const navigate = useNavigate();
    React.useEffect(() => {
        if (shouldReturn) navigate("/student-ad");
    });
    

    return (
        <div>
            <div className="form-element">
                <label className="input-label" htmlFor="">Opis: </label>
                <input id="student-ad-add-name-input" name="" onChange={element => setDescriptionValidator(getDescriptionValidator(element.target.value))}/>
                {getErrorParagrapgh(descriptionValidator)}
            </div>
            <div className="form-element">
                <label className="input-label" htmlFor="">Tagi: </label>
                <input id="student-ad-add-name-input" name="" onChange={element => setTags(element.target.value)}/>
            </div>
            <div className="form-element">
                <label className="input-label" htmlFor="">Przedmiot: </label>
                <input id="student-ad-add-name-input" name="" onChange={element => setSubjectValidator(getSubjectValidator(element.target.value))}/>
                {getErrorParagrapgh(subjectValidator)}
            </div>
            <div>
                <button className="submit-button" onClick={() => {
                    submitForm(descriptionValidator, setDescriptionValidator, subjectValidator, setSubjectValidator, tags, setShouldReturn);
                }}>Dodaj</button>
            </div>
        </div>
    );
}