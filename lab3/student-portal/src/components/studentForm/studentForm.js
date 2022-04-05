import React from "react";

export default class StudentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            name: props.name,
            isNameValid: props.isNameValid,
            nameErrorMsg: props.nameErrorMsg,
            lastName: props.lastName,
            isLastNameValid: props.isLastNameValid,
            lastNameErrorMsg: props.lastNameErrorMsg,
            email: props.email,
            isEmailValid: props.isEmailValid,
            emailErrorMsg: props.emailErrorMsg,
        }
    }

    validateName(name) {
        if(name.length === 0){
            this.setState({
                name: name,
                isNameValid: false,
                nameErrorMsg: "Imię nie może być puste"
            })
        } else{
            this.setState({
                name: name,
                isNameValid: true,
                nameErrorMsg: ""
            })
        }
    }

    validateLastName(lastName) {
        if(lastName.length === 0){
            this.setState({
                lastName: lastName,
                isLastNameValid: false,
                lastNameErrorMsg: "Nazwisko nie może być puste"
            })
        } else{
            this.setState({
                lastName: lastName,
                isLastNameValid: true,
                lastNameErrorMsg: ""
            })
        }
    }

    validateEmail(email) {
        if(email.length === 0){
            this.setState({
                email: email,
                isEmailValid: false,
                emailErrorMsg: "Email nie może być pusty"
            })
        } else if(!email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            this.setState({
                email: email,
                isEmailValid: false,
                emailErrorMsg: "Email jest niepoprawny"
            })
        } else{
            this.setState({
                email: email,
                isEmailValid: true,
                emailErrorMsg: ""
            })
        }
    }

    nameChanged(name) {
        this.validateName(name);
        this.updateStudentInfo();
    }

    lastNameChanged(lastName) {
        this.validateLastName(lastName);
        this.updateStudentInfo();
    }

    emailChanged(email) {
        this.validateEmail(email);
        this.updateStudentInfo();
    }

    updateStudentInfo() {
        return;
    }

    render() {
            return(
                <div style={{marginBottom: "30px"}}>
                    <div className="form-element">
                        <label className="input-label" htmlFor="">Imię: </label>
                        <input id="" name="" onChange={element => this.nameChanged(element.target.value)}/>
                        { !this.state.isNameValid && <p className="error-p">{ this.state.nameErrorMsg }</p>}
                    </div>
                    <div className="form-element">
                        <label className="input-label" htmlFor="">Nazwisko: </label>
                        <input id="" name="" onChange={element => this.lastNameChanged(element.target.value)}/>
                        { !this.state.isLastNameValid && <p className="error-p">{ this.state.lastNameErrorMsg }</p>}
                    </div>
                    <div className="form-element">
                        <label className="input-label" htmlFor="">Email: </label>
                        <input id="" name="" onChange={element => this.emailChanged(element.target.value)}/>
                        { !this.state.isEmailValid && <p className="error-p">{ this.state.emailErrorMsg }</p>}
                    </div>
                </div>
      )
    }
  }