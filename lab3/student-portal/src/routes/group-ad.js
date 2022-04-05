import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getGroupsAds } from "../database/service/groupAdService";
import { areTagsMatching } from "../utils";


function getFilteredStudentsAds(searchDescriptionExpression, searchTagsExpression, searchSubjectExpression, groupsAds) {
    return groupsAds.filter( groupAd => {
        return groupAd.description.toLowerCase().includes(searchDescriptionExpression.toLowerCase());
    }).filter( groupAd => {
        return areTagsMatching(searchTagsExpression.split(" "), groupAd.tags)
    }).filter( groupAd => {
        return groupAd.subject.toLowerCase().includes(searchSubjectExpression.toLowerCase());
    }).map( (groupAd, i) => {
        let tags = "";
        groupAd.tags.forEach(tag => {
            tags += tag + " "       
        });
        return (
            <div className="student-ad-element" key={i}>
                <p><b>Nazwa grupy: </b>{groupAd.name}</p>
                <p><b>Członkowie grupy: </b>{groupAd.studentsText}</p>
                <p><b>Opis: </b>{groupAd.description}</p>
                <p><b>Przedmiot: </b>{groupAd.subject}</p>
                <p><b>Tagi: </b>{tags}</p>
            </div>
        )
    })
}


export default function GroupAd() {
    const [groupsAds] = useState(getGroupsAds());
    const [searchDescriptionExpression, setSearchDescriptionExpression] = useState("");
    const [searchTagsExpression, setSearchTagsExpression] = useState("");
    const [searchSubjectExpression, setSearchSubjectExpression] = useState("");
    const [shouldRedirectToCreate, setShouldRedirectToCreate] = useState(false);

    const navigate = useNavigate();
    React.useEffect(() => {
        if (shouldRedirectToCreate) navigate("/group-ad-add");
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
                {getFilteredStudentsAds(searchDescriptionExpression, searchTagsExpression, searchSubjectExpression, groupsAds)}
            </div>
        </div>
    );
}
