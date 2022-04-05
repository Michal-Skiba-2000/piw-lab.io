import GroupAd from "../models/GroupAd";
import { getStudents } from "./studentService";


const groupsAdsReference = 'groupsAds';
const groupsAdsIdCounterReference = 'groupsAdsIdCounter';
const students = getStudents();
const baseGroupsAdsIdCounter = 2;
const baseGroupsAds = [
    new GroupAd(1, "Alpha team", [students[0], students[1], students[2]], "Szukamy trzech osób do ogarnięcia frontu w naszej apce, preferujemy angulara", ["projekt", "nikodem", "frontend", "angular"], "pz"),
    new GroupAd(2, "Wyspiarze", [students[3], students[4], students[5]], "Potrzebujemy do zespołu mistrza który skonfiguruje nam arduino i raspberry, żeby nasza apka miała dostęp do pomiarów z czujników", ["projekt", "serafin", "patronik", "embedded", "arduino", "raspberrypi"], "pz"),
]


function getGroupsAds() {
    const groupsAds = localStorage.getItem(groupsAdsReference);
    if(groupsAds !== null){
        return JSON.parse(groupsAds)
    } else {
        localStorage.setItem(groupsAdsReference, JSON.stringify(baseGroupsAds));
        localStorage.setItem(groupsAdsIdCounterReference, baseGroupsAdsIdCounter);
        return getGroupsAds();
    }
}


function getNextGroupAdId() {
    let nextGroupAdId = parseInt(localStorage.getItem(groupsAdsIdCounterReference)) + 1;
    localStorage.setItem(groupsAdsIdCounterReference, nextGroupAdId);
    return nextGroupAdId;
}


function createGroupAd(name, students, description, tags, subject) {
    const groupAdId = getNextGroupAdId();
    const newGroupAd = new GroupAd(groupAdId, name, students, description, tags, subject)

    let groupsAds = getGroupsAds();
    groupsAds.push(newGroupAd);
    localStorage.setItem(groupsAdsReference, JSON.stringify(groupsAds));

    return newGroupAd;
}


export { getGroupsAds, createGroupAd }
