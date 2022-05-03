import GroupAd from "../models/GroupAd";
import { getStudentById } from "./studentService";


const groupsAdsReference = 'groupsAds';
const groupsAdsCounterReference = 'groupsAdsCounter';
const group_ads_path = '/data/group_ads.json';


async function populateGroupsAds() {
    // fetch data from file
    const groupAdsData = await fetch(group_ads_path)
                               .then(response => response.json())
    // populate students field with student objects
    for (let [groupAdIndex, groupAd] of groupAdsData['group_ads'].entries()) {
        for (let [studentIdIndex, studentId] of groupAd['students'].entries()) {
            const student = await getStudentById(studentId)
            groupAdsData['group_ads'][groupAdIndex]['students'][studentIdIndex] = student;
        }
    }
    // transform object to GroupAd model
    groupAdsData['group_ads'] = groupAdsData['group_ads']
                                    .map(groupAd => new GroupAd(groupAd['id'],
                                                                groupAd['name'],
                                                                groupAd['students'],
                                                                groupAd['description'],
                                                                groupAd['tags'],
                                                                groupAd['subject']));
    localStorage.setItem(groupsAdsCounterReference, groupAdsData['counter']);
    localStorage.setItem(groupsAdsReference, JSON.stringify(groupAdsData['group_ads']));
}


async function getGroupsAds() {
    let groupsAds = localStorage.getItem(groupsAdsReference);
    if (groupsAds === null) {
        await populateGroupsAds();
        return await getGroupsAds();
    }
    return JSON.parse(groupsAds);
}


async function getGroupAdId() {
    let groupsAdsCounter = localStorage.getItem(groupsAdsCounterReference);
    if (groupsAdsCounter === null) {
        await populateGroupsAds();
        return await getGroupsAds();
    }
    groupsAdsCounter = parseInt(groupsAdsCounter) + 1;
    localStorage.setItem(groupsAdsCounterReference, groupsAdsCounter);
    return groupsAdsCounter;
}


async function createGroupAd(name, students, description, tags, subject) {
    const id = await getGroupAdId();
    const newGroupAd = new GroupAd(id, name, students, description, tags, subject)

     let groupsAds = await getGroupsAds();
     groupsAds.push(newGroupAd);
     localStorage.setItem(groupsAdsReference, JSON.stringify(groupsAds));
}


export { getGroupsAds, createGroupAd }
