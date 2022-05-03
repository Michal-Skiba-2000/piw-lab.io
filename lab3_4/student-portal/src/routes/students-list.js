import { useState, useEffect } from "react";
import { getStudents } from "../database/service/studentService";
import { Link } from "react-router-dom";
import "./students-list.scss";


export default function StudentsList() {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const getAndSetStudents = async () => {
          const students = await getStudents();
          setStudents(students);
        }

        getAndSetStudents()
          .catch(console.error);
    }, []);

    return (
        <div className="students-container">
            <ul>
                {students.map(student => (
                    <li key={student.id}><Link className="student-link-element" to={'/student/' + student.id}>{student.name} {student.lastName}</Link></li>
                ))}
            </ul>
        </div>
    );
}
