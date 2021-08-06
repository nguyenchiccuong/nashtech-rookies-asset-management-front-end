import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './CreateNewUser.css';

const Checkbox = ({ label, value, onChange }) => {
    return (
        <>
            <input type="radio" checked={value} onChange={onChange} />
            <label>{label}</label>
        </>
    );
};

const CreateNewUser = () => {
    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [gender, setGender] = useState("");
    const [joinedDate, setJoinedDate] = useState("");
    const [role, setRole] = useState("ROLE_ADMIN");
    const [location, setLocation] = useState("");

    const [checkedFemale, setCheckedFemale] = useState(false);
    const [checkedMale, setCheckedMale] = useState(false);

    const [valid, setValid] = useState("");
    const [validDOB, setValidDOB] = useState(true);
    const [validJD, setValidJD] = useState(true);
    let Url = "http://localhost:9994/asset-management/api/users/save";

    useEffect(() => {
        //do something
    }, [valid])

    const handleValid = (mes, type) => {
        setValid(mes);
        if (!type) {
            setValidDOB(false);
            setValidJD(true);
        } else {
            setValidJD(false);
            setValidDOB(true);
        } 
    }

    const handleChangeFemale = () => {
        setGender("Female");
        setCheckedFemale(checkedFemale => !checkedFemale);
        setCheckedMale(false);
    };

    const handleChangeMale = () => {
        setGender("Male");
        setCheckedMale(checkedMale => !checkedMale);
        setCheckedFemale(false);
    };

    const CheckValidation =  () => {
        var dob = new Date(dateOfBirth);
        var jd = new Date(joinedDate);
        var now = new Date();
        var age = now.getFullYear() - dob.getFullYear();
        if (age < 18) {
            handleValid("User is under 18. Please select a different date", false);
            return false;
        }           
        if (jd < dob) {
            handleValid("Joined date is not later than Date of Birth. Please select a different date", true);
            return false;
        }
        if (jd.getDay() == 0 || jd.getDay() == 7) {
            handleValid("Joined date is Saturday or Sunday. Please select a different date", true);
            return false;
        }
        return true;
    }
    
    const handleSaveUser = () => {
        const check = CheckValidation();
        const data = {
            firstName, lastName, dateOfBirth: dateOfBirth + ' 00:00', gender, joinedDate: joinedDate + ' 00:00', role, location: 1
        }
        console.log(data);
        if (check) {
            axios.post(Url, {
                firstName, lastName, dateOfBirth: dateOfBirth + ' 00:00', gender, joinedDate: joinedDate + ' 00:00', role, location: 1
            })
            .then(() => {
                alert("Create New User OK!")
            }).catch(err => console.log(err))
        } 
    }

    const handleCancel = () => {
        //go back to manage user page
    }

    return (
        <div id="create-new-user">
            <div id="create-user-title">Create New User</div>
            <form id="create-user-form">
                <div className="First_name">
                    <label htmlFor="firstname" className="label">First Name</label>
                    <input className="input" type="text" name="firstname" value={firstName}
                        onChange={({ target }) => setFirstName(target.value)}/>
                </div>
                <div className="Last_name">
                    <label htmlFor="lastname" className="label">Last Name</label>
                    <input className="input" type="text" name="lastname" value={lastName}
                        onChange={({ target }) => setLastName(target.value)}/>
                </div>
                <div className="DOB">
                    <label htmlFor="dateOfBirth" className="label">Date Of Birth</label>
                    <input className={!validDOB ? "red-input" : "input"} type="date" name="dateOfBirth" value={dateOfBirth}
                        onChange={({ target }) => setDateOfBirth(target.value)}/>
                    <p className={!validDOB ? "show-error" : "none"}>{valid}</p>
                </div>
                <div className="Gender">
                    <p>Gender</p>
                    <div className="gender-check">
                        <Checkbox
                            label="Female"
                            value={checkedFemale}
                            onChange={handleChangeFemale}
                        />
                        &ensp;&ensp;&ensp;&ensp;&ensp;
                        <Checkbox
                            label="Male"
                            value={checkedMale}
                            onChange={handleChangeMale}
                        />
                    </div>
                </div>
                <div className="Joined_Date">
                    <label htmlFor="joinedDate" className="label">Joined Date</label>
                    <input className={!validJD ? "red-input" : "input"} type="date" name="joinedDate" value={joinedDate}
                        onChange={({ target }) => setJoinedDate(target.value)}/>
                    <p className={!validJD ? "show-error" : "none"}>{valid}</p>
                </div>
                <div className="Type">
                    <label htmlFor="role" className="label">Type</label>
                    <select className="input" name="role" value={role}
                        onChange={({ target }) => setRole(target.value)}>
                        <option value="ROLE_ADMIN">Admin</option>
                        <option value="ROLE_USER">Staff</option>
                    </select>
                </div>
            </form>
            <div className="button-flex">
                <button className="save-btn" onClick={handleSaveUser}>SAVE</button>
                <button className="cancel-btn" onClick={handleCancel}>CANCEL</button>
            </div>
        </div>
    )
}

export default CreateNewUser;