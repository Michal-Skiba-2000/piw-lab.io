import Student from "../models/Student";


const studentsReference = 'students';
const studentsIdCounterReference = 'studentsIdCounter';
const loggedStudentIdReference = 'loggedStudentId';
const baseStudentsIdCounter = 6;
const baseStudents = [
    new Student(1, "Jan", "Kowalski", "123456@student.pwr.edu.pl"),
    new Student(2, "Piotr", "Nowak", "234567@student.pwr.edu.pl"),
    new Student(3, "Jakub", "Moder", "345678@student.pwr.edu.pl"),
    new Student(4, "Andrzej", "Grabowski", "456789@student.pwr.edu.pl"),
    new Student(5, "Nikola", "Pruna", "567890@student.pwr.edu.pl"),
    new Student(6, "Ola", "Piątek", "678901@student.pwr.edu.pl"),
]


function getStudents() {
    const students = localStorage.getItem(studentsReference);
    if(students !== null){
        return JSON.parse(students)
    } else {
        localStorage.setItem(studentsReference, JSON.stringify(baseStudents));
        localStorage.setItem(studentsIdCounterReference, JSON.stringify(baseStudentsIdCounter));
        return getStudents();
    }
}


function getStudentById(id) {
    return getStudents().find( ( student ) => student.id === id );
}


function getLoggedStudent() {
    const loggedStudentId = parseInt(localStorage.getItem(loggedStudentIdReference));
    const student = getStudentById(loggedStudentId);
    return student;
}


export { loggedStudentIdReference, getStudents, getStudentById, getLoggedStudent }
