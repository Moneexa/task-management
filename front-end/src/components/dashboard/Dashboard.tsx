import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Result } from '../../axiosCall/axiosTypes';
import { axiosHelperFunction } from "../../axiosCall/axiosHelper";
type Team = { name: "", _id: "" }
export default function Dashboard() {
    const navigate = useNavigate()
    const [teams, setTeams] = useState<Result<Team[], string>>({ status: "init" })
    useEffect(() => {
        async function func() {
            const response = await axiosHelperFunction<Team[], string>({ "dataSource": "teams", fetchType: "get", queryParam: "" })
            if (response.status == "success") {
                if (typeof response.data !== "string") {
                    setTeams(response)
                }

            }
        }
        func()
    }, [])
    return <>
        <div className="h-1">Your Teams</div>
        <div className="teams-row">
            {
                teams.status == "loading" && 'loading...'
            }
            {
                teams.status == "success" && typeof teams.data !== "string" ? teams.data.map((value: { name: string, _id: string }, index) => {
                    return <div className="team-row-element" key={index}
                        onClick={() => {

                            navigate(`/backlog/${value._id}`)

                        }}
                    >{value.name}</div>

                }) : ''
            }
            {
                teams.status == "error" && teams.errorMessage
            }
            <div className="team-row-element" onClick={() => {
                navigate('/team')
            }}>+ Create New Team</div>
        </div>
    </>
}