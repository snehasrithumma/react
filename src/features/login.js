import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/authContext'; // Adjust the path as needed
import { useForm } from "./customHook/useForm";
import './login.css'

export default function Login() {
    const [isValidLogin, setIsValidLogin] = useState(null);
    const navigate = useNavigate();
    const { login } = useAuth();
    const [value, onChange] = useForm({ 'email': '', 'password': '' })
    console.log(value)

    const handleSubmit = (event) => {
        event.preventDefault();
        const isAuthenticated = (value.email === 'sneha@gmail.com' && value.password === 'Welcome');
        setIsValidLogin(isAuthenticated);
        if (isAuthenticated) {
            login(value.email); // Update authentication state in context
            console.log("Navigating to home page..."); // Debug log
            navigate("/"); // Redirect to the home page
        }
    };

    if (isValidLogin === false) {
        return <div><span>Wrong Email or password</span></div>;
    }

    return (
        <div className="mainContent">
            <form className="login" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='email-input'>Email</label>
                    <input id='email-input' name='email'
                        type='email'
                        value={value.email}
                        placeholder="Enter your email here"
                        onChange={(event) => onChange(event)}
                    />
                </div>
                <div>
                    <label htmlFor='password-input'>Password</label>
                    <input id='password-input' name='password'
                        type='password'
                        value={value.password}
                        placeholder="Enter your password here"
                        onChange={(event) => onChange(event)}
                    />
                </div>
                <button type="submit">Log In</button>
            </form >
        </div >
    );
}
