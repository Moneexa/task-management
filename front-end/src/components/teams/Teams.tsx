import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosHelperFunction } from "../../axiosCall/axiosHelper";

type Team = {
    name: string, members: string[]
}

type TeamResponse = {
    id: string
} & Team

export default function Teams() {
    const [teamData, setTeamData] = useState({ name: "", members: [""] });
    const navigate = useNavigate()

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setTeamData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleMemberChange = (index: number, value: string) => {
        setTeamData(prevData => {
            const updatedMembers = [...prevData.members];
            updatedMembers[index] = value; // Update the specific member
            return { ...prevData, members: updatedMembers };
        });
    };

    const addMember = () => {
        setTeamData(prevData => ({
            ...prevData,
            members: [...prevData.members, ""] // Add a new member with an empty string
        }));
    };

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Submitted Team Data:", teamData);
        const resp = await axiosHelperFunction<Team, TeamResponse>({
            "dataSource": "/team/create",
            "fetchType": "post",
            "payload": teamData
        })
        if (resp.status == "success") {
            const responseData = resp.data
            console.log("Response:", resp.data);
            //@ts-ignore
            navigate(`/tasks?teamID=${resp.data.id}`)
        }
    };
    return (
        <div className="user-signup">
            <h1>Let's Make it Happen Together</h1>
            <form onSubmit={submit}>
                <label>Team Name</label>
                <input
                    type="text"
                    name="name"
                    placeholder="Enter Your Team Name"
                    value={teamData.name}
                    onChange={handleInputChange}
                />
                <label>Add Team Members</label>
                {teamData.members.map((member, index) => (
                    <div key={index} style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                        <input
                            type="text"
                            placeholder="Enter your team member's email"
                            value={member}
                            onChange={(e) => handleMemberChange(index, e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={addMember}
                            style={{ marginLeft: "5px" }}
                        >
                            +
                        </button>
                    </div>
                ))}
                <button type="submit">Add Tasks for the Team</button>
            </form>
        </div>
    );
}
