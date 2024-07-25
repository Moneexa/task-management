import React, { useState } from "react";
import axios from "axios";


export default function UserAuthentication() {
    const [inputs, setInputs] = useState({ name: "", email: "", password: "" })
    const [formSent, setFormSent] = useState(false)
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        let obj = inputs
        setInputs({ ...obj, [name]: value })
    }

    const submit = async (e: React.FormEvent) => {
        e.preventDefault()
        try{
            const response = await axios.post('http://localhost:5000/api/signup', inputs)
            if(response){
                setFormSent(true)
            }
            console.log(inputs);
            setFormSent(true)
        }
        catch(error){
            alert(error)
            console.log(error)
        }
    }
    return <div className="user-signup">
        <div className="h-1">Let's Make it Happen Together</div>
        <form onSubmit={(e) => submit(e)}>
            <label>Full Name</label>
            <input type="text" name="name" placeholder="Enter Your Full Name" value={inputs.name} onChange={(e) => handleInputChange(e)} />
            <label>Email</label>
            <input type="text" name="email" placeholder="Enter your email" value={inputs.email} onChange={(e) => handleInputChange(e)} />
            <label>Password</label>
            <input type="password" name="password" placeholder="Enter the password" value={inputs.password} onChange={(e) => handleInputChange(e)} />
            <label>Retype Password</label>
            <input type="password" name="password" placeholder="Retype the password" value={inputs.password} onChange={(e) => handleInputChange(e)} />
            <button type="submit">Submit</button>
        </form>
        {
            formSent && <div className="link"> Check your email for the link</div>

        }
    </div>
}