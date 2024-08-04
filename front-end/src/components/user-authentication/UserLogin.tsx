import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function UserLogin(props:{setLoggedIn(log:Boolean):void}) {
    const [inputs, setInputs] = useState({ email:"", password: "" })
    const navigate=useNavigate()
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        let obj = inputs
        setInputs({ ...obj, [name]: value })
    }

    const submit = async (e: React.FormEvent) => {
        e.preventDefault()
        try{
            const response = await axios.post('http://localhost:5000/api/login', inputs)
            debugger
            if(response){
                localStorage.setItem('auth', response.data)
                props.setLoggedIn(true)
                navigate('/dashboard')
            }
        }
        catch(error){
            alert(error)
            console.log(error)
        }
    }
    return <div className="user-signup">
        <div className="h-1">Let's Make it Happen Together</div>
        <form onSubmit={(e) => submit(e)}>
            <label>Email</label>
            <input type="text" name="email" placeholder="Enter your email" value={inputs.email} onChange={(e) => handleInputChange(e)} />
            <label>Password</label>
            <input type="password" name="password" placeholder="Enter the password" value={inputs.password} onChange={(e) => handleInputChange(e)} />
            <button type="submit">Submit</button>
        </form>
    </div>
}