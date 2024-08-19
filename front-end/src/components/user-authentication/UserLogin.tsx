import React, { useState } from "react";
import { axiosHelperFunction } from "../../axiosCall/axiosHelper";
import { useNavigate } from "react-router-dom";

type Inputs = { email: string, password: string }

export default function UserLogin(props: { setLoggedIn(log: Boolean): void }) {
    const [inputs, setInputs] = useState({ email: "", password: "" })
    const navigate = useNavigate()
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        let obj = inputs
        setInputs({ ...obj, [name]: value })
    }

    const submit = async (e: React.FormEvent) => {
        e.preventDefault()
        const result = await axiosHelperFunction<Inputs, string>({ dataSource: "login", "fetchType": "post", "payload": inputs })
        if (result.status == "success") {
            const responseData = result.data
            if (typeof responseData == "string") {
                localStorage.setItem('auth', responseData)
                props.setLoggedIn(true)
                navigate('/dashboard')
            }
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