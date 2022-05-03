export default class GroupAd {
    constructor(id, name, students, description, tags, subject) {
        this.id = id;
        this.name = name;
        this.students = students;
        this.studentsText = this.getHumanReadableStudents()
        this.description = description;
        this.tags = tags;
        this.subject = subject;
    }

    getHumanReadableStudents() {
        let studentsText = "";
        this.students.forEach(student => {
            studentsText += student.name + " " + student.lastName + ", ";
        });
        return studentsText.substring(0, studentsText.length - 2);
    }
}
