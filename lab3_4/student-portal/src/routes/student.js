import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getStudentById, updateStudentWithPhoto } from '../database/service/studentService';
import "./student.scss";


export default function Student() {
    const [student, setStudent] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const getAndSetStudent = async () => {
            let student = await getStudentById(parseInt(id));
            if(student.photoUrl === null){
                student = await updateStudentWithPhoto(student);
            }
            setStudent(student);
        }

        getAndSetStudent()
          .catch(console.error);
    }, [id]);

    return (
        <div>
            { student ?
                <div className="student-container">
                    <img src={student.photoUrl} alt=""></img>
                    <p><b>Imię: </b>{student.name}</p>
                    <p><b>Nazwisko: </b>{student.lastName}</p>
                    <p><b>Email: </b>{student.email}</p>
                </div>: null
            }
        </div>
       
    );
}