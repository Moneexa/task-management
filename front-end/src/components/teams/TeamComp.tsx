import React, { useEffect, useState } from "react";
import { axiosHelperFunction } from "../../axiosCall/axiosHelper";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
type Task = { taskNumber: string, description: string, status: string }

type TaskObj = { tasks: Task, teamID: string }

export default function TeamsCom() {
    const { teamID } = useParams()
    const navigate = useNavigate()
    const [teamTask, setTeamTask] = useState({ taskNumber: "", description: "", status: "" })
    useEffect(() => {
        debugger;
        console.log({ teamID })
    }, [])
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setTeamTask(prevData => ({
            ...prevData,
            [name]: value
        }));
    }
    const formSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const obj = teamTask
        obj["status"] = "todo"
        if (!teamID) {
            throw new Error("wrong task ID")
        }
        setTeamTask({ ...obj })
        const result = await axiosHelperFunction<TaskObj, string>({ "dataSource": "tasks", fetchType: "post", "payload": { tasks: teamTask, teamID: teamID } })
        if (result.status == "success") {
            navigate(`/backlog/${teamID}`)
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

