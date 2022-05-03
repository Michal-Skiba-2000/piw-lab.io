import Student from "../models/Student";


const loggedStudentIdReference = 'loggedStudentId';
const studentsReference = 'students';
const studentsCounterReference = 'studentsCounter';
const students_path = '/data/students.json';


async function populateStudents() {
    // fetch data from file
    const studentsData = await fetch(students_path)
                               .then(response => response.json())
    // transform object to Student model
    studentsData['students'] = studentsData['students']
                                .map(student => new Student(student['id'],
                                                            student['name'],
                                                            student['lastName'],
                                                            student['email'],
                                                            student['hashedPassword']));

    localStorage.setItem(studentsCounterReference, studentsData['counter']);
    localStorage.setItem(studentsReference, JSON.stringify(studentsData['students']));
}


async function getStudents() {
    let students = localStorage.getItem(studentsReference);
    if (students === null) {
        await populateStudents();
        return await getStudents();
    }
    return JSON.parse(students);
}


async function getStudentById(id) {
    const students = await getStudents();
    return students.find( ( student ) => student.id === id );
}


async function getLoggedStudent() {
    const loggedStudentId = parseInt(localStorage.getItem(loggedStudentIdReference));
    const student = await getStudentById(loggedStudentId);
    return student;
}


async function updateStudentWithPhoto(student) {
    student.photoUrl = await fetch('https://picsum.photos/300')
                                .then(response => response.url)
    const students = await getStudents();
    const index = students.findIndex(obj => obj.id === student.id);
    students[index] = student;
    localStorage.setItem(studentsReference, JSON.stringify(students));
    return student;
}


async function loginStudent(email, hashedPassword) {
    const students = await getStudents();
    const loggedStudent = students.find( ( student ) => student.email === email && student.hashedPassword === hashedPassword );
    if (loggedStudent) {
        return loggedStudent.id;
    } else {
        return null;
    }
}


async function getStudentId() {
    let studentsCounter = localStorage.getItem(studentsCounterReference);
    if (studentsCounter === null) {
        await populateStudents();
        return await getStudentId();
    }
    studentsCounter = parseInt(studentsCounter) + 1;
    localStorage.setItem(studentsCounterReference, studentsCounter);
    return studentsCounter;
}


async function registerStudent(name, lastName, email, hashedPassword) {
    const id = await getStudentId();
    const newStudent = new Student(id, name, lastName, email, hashedPassword);

    let students = await getStudents();
    students.push(newStudent);
    localStorage.setItem(studentsReference, JSON.stringify(students));
}


export { getStudents, getStudentById, getLoggedStudent, updateStudentWithPhoto, loginStudent, registerStudent }
