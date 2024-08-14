import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Dashboard() {
    const navigate = useNavigate()
    const [teams, setTeams] = useState([])
    useEffect(() => {
        async function func() {
            try {
                const response = await axios.get('http://localhost:5000/api/teams/',
                    {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('auth')}`
                        }
                    })
                if (response) {
                    setTeams(response.data)

                }
            }
            catch (error) {
                alert(error)
            }
        }
        func()
    }, [])
    return <>
        <div className="h-1">Your Teams</div>
        <div className="teams-row">
            {
                teams.map((value: { name: string, _id:string}, index) => {
                    return <div className="team-row-element" key={index}
                    onClick={() => {
                        
                        navigate(`/backlog/${value._id}`)

                    }}
                    >{value.name}</div>

                })
            }
            <div className="team-row-element" onClick={() => {
                navigate('/team')
            }}>+ Create New Team</div>
        </div>
    </>
}