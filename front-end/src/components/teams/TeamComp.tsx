import axios from "axios";
import React, { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";

export default function TeamsCom() {
    const {teamID} = useParams()
    const navigate=useNavigate()
    const [teamTask, setTeamTask] = useState({ taskNumber: "", description: "", status: ""})
    useEffect(()=>{
        debugger;
        console.log({teamID})
    },[])
    const handleInputChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const {name, value}=e.target
        setTeamTask(prevData => ({
            ...prevData,
            [name]: value
        }));
    }
    const formSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const obj=teamTask
        obj["status"]="todo"
        if(!teamID){
            throw new Error("wrong task ID")
        }
        setTeamTask({...obj})
            try {
                const resp = await axios.post(`http://localhost:5000/api/tasks/`, {tasks:teamTask, teamID:teamID}, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('auth')}`
                    }
                })
                if(resp){
                    console.log("submission successfull")
                }
                navigate(`/backlog/${teamID}`)
            }catch(error){
                console.error(error)
            }
        }
    return <div className="user-signup">
    <div className="h-1">Add the Tasks for Your Team</div>
    <form onSubmit={(e) => formSubmit(e)}>
        <label>Task Number</label>
        <input type="text" name="taskNumber" placeholder="Enter Your Number" value={teamTask.taskNumber} onChange={(e) => handleInputChange(e)} />
        <label>Description</label>
        <input type="text" name="description" placeholder="Enter the task headline" value={teamTask.description} onChange={(e) => handleInputChange(e)} />
        <button type="submit">Submit</button>
    </form>
   </div>
}

