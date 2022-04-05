import StudentAd from "../models/StudentAd";
import { getStudents, getLoggedStudent } from "./studentService";


const studentsAdsReference = 'studentsAds';
const studentsAdsIdCounterReference = 'studentsAdsIdCounter';
const students = getStudents();
const baseStudentsAdsIdCounter = 6;
const baseStudentsAds = [
    new StudentAd(1, students[0], "Szukam pary na ucisw2 wtorek TP 8:00-11:00", ["projekt", "sugier", "para"], "ucisw2"),
    new StudentAd(2, students[1], "Szukam pary na ucisw2 czwartek TN 12:15-15:15", ["projekt", "mazurkiewicz"], "ucisw2"),
    new StudentAd(3, students[2], "Szukam dwóch osób do projektu zespołowego", ["projekt", "patronik", "wolontariat"], "pz"),
    new StudentAd(4, students[3], "Ktoś chętny, żeby wziąć futsal razem w tym semetrze na wf?", ["futsal", "piłeczka"], "wf"),
    new StudentAd(5, students[4], "Szukam osoby do wspólnego robienia list z si", ["wspołpraca", "apesstrongtogether"], "si"),
    new StudentAd(6, students[5], "Ktoś chce coś robić razem do Nikodema na projekt zespołowy? Mogę się dostosować", ["projekt", "nikodem", "wolontariat", "pomocy"], "pz"),
]


function getStudentsAds() {
    const studentsAds = localStorage.getItem(studentsAdsReference);
    if(studentsAds !== null){
        return JSON.parse(studentsAds)
    } else {
        localStorage.setItem(studentsAdsReference, JSON.stringify(baseStudentsAds));
        localStorage.setItem(studentsAdsIdCounterReference, baseStudentsAdsIdCounter);
        return getStudentsAds();
    }
}


function getNextStudentAdId() {
    let nextStudentAdId = parseInt(localStorage.getItem(studentsAdsIdCounterReference)) + 1;
    localStorage.setItem(studentsAdsIdCounterReference, nextStudentAdId);
    return nextStudentAdId;
}


function createStudentAd(description, tags, subject) {
    const studentAdId = getNextStudentAdId();
    const student = getLoggedStudent();
    const newStudentAd = new StudentAd(studentAdId, student, description, tags, subject)

    let studentsAds = getStudentsAds();
    studentsAds.push(newStudentAd);
    localStorage.setItem('studentsAds', JSON.stringify(studentsAds));

    return newStudentAd;
}


export { getStudentsAds, createStudentAd }