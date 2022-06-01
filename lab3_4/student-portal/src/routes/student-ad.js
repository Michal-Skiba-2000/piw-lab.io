import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getStudentsAds } from "../database/service/studentAdService";
import { areTagsMatching } from "../utils";
import { isUserLoggedIn } from '../App.js';
import { auth } from '../firebase/init';
import { useAuthState } from 'react-firebase-hooks/auth';
import "./student-ad.scss"

function getFilteredStudentsAds(searchDescriptionExpression, searchTagsExpression, searchSubjectExpression, studentsAds) {
    return studentsAds.filter( studentAd => {
        return studentAd.description.toLowerCase().includes(searchDescriptionExpression.toLowerCase());
    }).filter( studentAd => {
        return areTagsMatching(searchTagsExpression.split(" "), studentAd.tags)
    }).filter( studentAd => {
        return studentAd.subject.toLowerCase().includes(searchSubjectExpression.toLowerCase());
    }).map( (studentAd, i) => {
        let tags = "";
        studentAd.tags.forEach(tag => {
            tags += tag + " "       
        });
        return (
            <div className="student-ad-element" key={i}>
                <p><b>Imię i nazwisko studenta: </b>{studentAd.student.name} {studentAd.student.lastName}</p>
                <p><b>Opis: </b>{studentAd.description}</p>
                <p><b>Przedmiot: </b>{studentAd.subject}</p>
                <p><b>Tagi: </b>{tags}</p>
            </div>
        )
    })
}

export default function StudentAd() {
    const [studentsAds, setStudentsAds] = useState([]);
    const [searchDescriptionExpression, setSearchDescriptionExpression] = useState("");
    const [searchTagsExpression, setSearchTagsExpression] = useState("");
    const [searchSubjectExpression, setSearchSubjectExpression] = useState("");
    const [shouldRedirectToCreate, setShouldRedirectToCreate] = useState(false);
    const [user, loading] = useAuthState(auth);

    useEffect(() => {
        const navigateUser = async () => {
          const loggedIn = await isUserLoggedIn(user, loading);
          if( loggedIn ){
            console.log('is logged in');
            navigate("/student-ad");
          }
          else{
            navigate("/login");
          }
        }

        navigateUser()
          .catch(console.error);
      }, []);

    useEffect(() => {
        const getAndSetStudentsAds = async () => {
          const studentAds = await getStudentsAds();
          setStudentsAds(studentAds);
        }

        getAndSetStudentsAds()
          .catch(console.error);
    }, []);

    const navigate = useNavigate();
    useEffect(() => {
        if (shouldRedirectToCreate) navigate("/student-ad-add");
    });
    
    return (
        <div>
            <div className="search-input">
                <label className="search-input-label" htmlFor="description-search-input">Wyszukaj po opisie: </label>
                <input id="description-search-input" name="description-search-input" onChange={element => setSearchDescriptionExpression(element.target.value)}/>
            </div>
            <div className="search-input">
                <label className="search-input-label" htmlFor="tags-search-input">Wyszukaj po tagach: </label>
                <input id="tags-search-input" name="tags-search-input" onChange={element => setSearchTagsExpression(element.target.value)}/>
            </div>
            <div className="search-input">
                <label className="search-input-label" htmlFor="subject-search-input">Wyszukaj po przedmiocie: </label>
                <input id="subject-search-input" name="subject-search-input" onChange={element => setSearchSubjectExpression(element.target.value)}/>
            </div>
            <div>
                <button className="student-add-ad-button" onClick={() => setShouldRedirectToCreate(true)}>Dodaj ogłoszenie</button>
            </div>
            <div className="student-ad-container">
                {getFilteredStudentsAds(searchDescriptionExpression, searchTagsExpression, searchSubjectExpression, studentsAds)}
            </div>
        </div>
    );
}
