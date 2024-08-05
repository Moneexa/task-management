import React from "react";
import { useNavigate } from "react-router-dom";
export default function Dashboard() {
    const navigate=useNavigate()
    return <>
        <div className="h-1">Your Teams</div>
        <div className="teams-row">
            <div className="team-row-element">Team1</div>
            <div className="team-row-element">Team2</div>
            <div className="team-row-element">Team3</div>
            <div className="team-row-element" onClick={()=>{
                navigate('/team')
            }}>+ Create New Team</div>
        </div>
    </>
}