import React from "react";
import { createGroupAd } from "../database/service/groupAdService";
import { getLoggedStudent, getStudentById, getStudents } from "../database/service/studentService";
import "./group-ad-add.scss";

export default class GroupAdAdd extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loggedStudent: null,
            availableStudents: [],
            student2: '',
            student3: '',
            name: '',
            isNameValid: true,
            nameErrorMessgae: '',
            description: '',
            isDescriptionValid: true,
            descriptionErrorMessgae: '',
            tags: '',
            subject: '',
            isSubjectValid: true,
            subjectErrorMessgae: '',
            redirect: false,
        }

        this.deleteStudent = this.deleteStudent.bind(this);
        this.setStudent2 = this.setStudent2.bind(this);
        this.setStudent3 = this.setStudent3.bind(this);
        this.setName = this.setName.bind(this);
        this.setDescription = this.setDescription.bind(this);
        this.setSubject = this.setSubject.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }


    async componentDidMount() {
        const loggedStudent = await getLoggedStudent();
        let availableStudents = await getStudents();
        availableStudents = this.deleteStudent(availableStudents, loggedStudent.id);
        this.setState({
            loggedStudent: loggedStudent,
            availableStudents: availableStudents,
        });
    }


    deleteStudent(studentsArray, studentId) {
        return studentsArray.filter(student => {
            return student.id !== studentId;
        })
    }


    setStudent2(element) {
        this.setState({student2: element.target.value});
    }


    setStudent3(element) {
        this.setState({student3: element.target.value});
    }


    setName(value) {
        let isValid = true;
        let errorMessage = '';

        if( value.length === 0 ) {
            isValid = false;
            errorMessage = 'Nazwa gurpy nie może być pusta'
        }

        this.setState({
            name: value,
            isNameValid: isValid,
            nameErrorMessgae: errorMessage,
        });

        return isValid;
    }


    setDescription(value) {
        let isValid = true;
        let errorMessage = '';

        if( value.length === 0 ) {
            isValid = false;
            errorMessage = 'Opis nie może być pusty'
        }

        this.setState({
            description: value,
            isDescriptionValid: isValid,
            descriptionErrorMessgae: errorMessage,
        });

        return isValid;
    }


    setSubject(value) {
        let isValid = true;
        let errorMessage = '';

        if( value.length === 0 ) {
            isValid = false;
            errorMessage = 'Przedmiot nie może być pusty'
        }

        this.setState({
            subject: value,
            isSubjectValid: isValid,
            subjectErrorMessgae: errorMessage,
        });

        return isValid;
    }

    async submitForm() {
        const isDescriptionValid = this.setDescription(this.state.description);
        const isSubjectValid = this.setSubject(this.state.subject);
        const isNameValid = this.setName(this.state.name);
        if( isDescriptionValid && isSubjectValid && isNameValid ){
            const students = [this.state.loggedStudent];

            if( this.state.student2 !== '' ) {
                const student2 = getStudentById(parseInt(this.state.student2));
                if( student2 ) students.push(student2);
            }

            if( this.state.student3 !== '' && this.state.student2 !== this.state.student3 ) {
                const student3 = getStudentById(parseInt(this.state.student3));
                if( student3 ) students.push(student3);
            }
            
            await createGroupAd(this.state.name, students, this.state.description, this.state.tags.trim().split(' '), this.state.subject);
            window.location.href = '/group-ad';
        }

        
    }


    renderStudentForms() {
        return (
            <div className="form-element">
                <div>
                    <label className="input-label" htmlFor="">Student 1: </label>
                    <select name="logged-student" id="logged-student" disabled>
                        {this.state.loggedStudent? <option value={this.state.loggedStudent.id}>{this.state.loggedStudent.name} {this.state.loggedStudent.lastName}</option>: null}
                    </select>
                </div>
                <div>
                    <label className="input-label" htmlFor="">Student 2: </label>
                    <select name="student-2" id="student-2" onChange={this.setStudent2}>
                        <option value=""></option>
                        {this.state.availableStudents.map(student => (
                            <option key={student.id} value={student.id}>{student.name} {student.lastName}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="input-label" htmlFor="">Student 3: </label>
                    <select name="student-2" id="student-2" onChange={this.setStudent3}>
                        <option value=""></option>
                        {this.state.availableStudents.map(student => (
                            <option key={student.id} value={student.id}>{student.name} {student.lastName}</option>
                        ))}
                    </select>
                </div>
            </div>
        )
    }


    render() {
        return(
            <div>
                <div className="form-element">
                    <label className="input-label" htmlFor="">Nazwa: </label>
                    <input id="group-ad-add-name-input" name="" onChange={element => this.setName(element.target.value)}/>
                    { !this.state.isNameValid? <p className="error-p">{this.state.nameErrorMessgae}</p>: null}
                </div>
                { this.renderStudentForms() }
                <div className="form-element">
                    <label className="input-label" htmlFor="">Opis: </label>
                    <input id="group-ad-add-description-input" name="" onChange={element => this.setDescription(element.target.value)}/>
                    { !this.state.isDescriptionValid? <p className="error-p">{this.state.descriptionErrorMessgae}</p>: null}
                </div>
                <div className="form-element">
                    <label className="input-label" htmlFor="">Tagi: </label>
                    <input id="group-ad-add-tags-input" name="" onChange={element => this.setState({tags: element.target.value})}/>
                </div>
                <div className="form-element">
                    <label className="input-label" htmlFor="">Przedmiot: </label>
                    <input id="group-ad-add-subject-input" name="" onChange={element => this.setSubject(element.target.value)}/>
                    { !this.state.isSubjectValid? <p className="error-p">{this.state.subjectErrorMessgae}</p>: null}
                </div>
                <div>
                    <button className="submit-button" onClick={this.submitForm}>Dodaj</button>
                </div>
            </div>
      )
    }
}
