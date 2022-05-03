import StudentAd from "../models/StudentAd";
import { getLoggedStudent, getStudentById } from "./studentService";


const studentsAdsReference = 'studentsAds';
const studentsAdsCounterReference = 'studentsAdsCounter';
const studentAdsPath = '/data/student_ads.json';


async function populateStudentsAds() {
    // fetch data from file
    const studentAdsData = await fetch(studentAdsPath)
                                 .then(response => response.json())
    // populate student field with student object
    for (let [index, studentAd] of studentAdsData['student_ads'].entries()) {
        studentAdsData['student_ads'][index]['student'] = await getStudentById(studentAd['student']);
    }
    // transform object to StudentAd model
    studentAdsData['student_ads'] = studentAdsData['student_ads']
                                        .map(studentAd => new StudentAd(studentAd['id'],
                                                                        studentAd['student'],
                                                                        studentAd['description'],
                                                                        studentAd['tags'],
                                                                        studentAd['subject']));

    localStorage.setItem(studentsAdsCounterReference, studentAdsData['counter']);
    localStorage.setItem(studentsAdsReference, JSON.stringify(studentAdsData['student_ads']));
}


async function getStudentsAds() {
    let studentsAds = localStorage.getItem(studentsAdsReference);
    if (studentsAds === null) {
        await populateStudentsAds();
        return await getStudentsAds();
    }
    return JSON.parse(studentsAds);
}


async function getStudentAdId() {
    let studentsAdsCounter = localStorage.getItem(studentsAdsCounterReference);
    if (studentsAdsCounter === null) {
        await populateStudentsAds();
        return await getStudentsAds();
    }
    studentsAdsCounter = parseInt(studentsAdsCounter) + 1;
    localStorage.setItem(studentsAdsCounterReference, studentsAdsCounter);
    return studentsAdsCounter;
}


async function createStudentAd(description, tags, subject) {
    const student = await getLoggedStudent();
    const id = await getStudentAdId();
    const newStudentAd = new StudentAd(id, student, description, tags, subject);

    let studentsAds = await getStudentsAds();
    studentsAds.push(newStudentAd);
    localStorage.setItem(studentsAdsReference, JSON.stringify(studentsAds));
}

export { getStudentsAds, createStudentAd }
