import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const formStyle = {
        width: "300px",
        margin: "200px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        backgroundColor: "pink",
    };

    const inputStyle = {
        width: "100%",
        padding: "10px",
        marginBottom: "10px",
        borderRadius: "4px",
        border: "1px solid #aaa",
    };

    const buttonStyle = {
        width: "100%",
        padding: "10px",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        backgroundColor: "green",
    };

    const containerStyle = {
        backgroundColor: "lightgreen",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
    };

    const contentWrapperStyle = {
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
    };

    const footerStyle = {
        color: "#fff",
        textAlign: "center",
        padding: "10px",
        marginTop: "auto",
        width: "100%",
        backgroundColor: "#222",
    };

    const headingStyle = {
        textAlign: "center",
        color: "darkblue",
        backgroundColor: "lightgray",
        borderRadius: "10px",
    };

    const forgotPasswordStyle = {
        color: "blue",
        textDecoration: "underline",
        fontSize: "14px",
        marginBottom: "10px",
        cursor: "pointer",
        background: "none",
        border: "none",
        textAlign: "left",
        padding: "0",
    };

    function handleNameChange(event) {
        setName(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    function handleSubmit(event) {
    event.preventDefault();

    if (!name.trim() || !password) {
        alert("Please enter all fields.");
        return;
    }

    // Proceed with login logic here



        axios.post('http://localhost:5000/login', {
            username: name,
            password: password
        })
            .then(response => {
                const { message, token } = response.data;

                if (token) {
                    localStorage.setItem('authToken', token); // Store token for future use
                    alert(message);
                    navigate("/Dashboard");
                } else {
                    alert(message || "Login failed");
                }

                setName("");
                setPassword("");
            
            })
            .catch(error => {
                const msg = error.response?.data?.message || "Login failed.";
                alert(msg);
            });

    }

    return (
        <div style={containerStyle}>
            <div style={contentWrapperStyle}>
                <form onSubmit={handleSubmit} style={formStyle}>
                    <h1 style={headingStyle}>LOGIN FORM</h1>

                    <label>USERNAME</label>
                    <input
                        type="text"
                        name="Name"
                        value={name}
                        onChange={handleNameChange}
                        placeholder="Enter your username"
                        style={inputStyle}
                    />

                    <label>PASSWORD</label>
                    <input
                        type="password"
                        name="Password"
                        value={password}
                        onChange={handlePasswordChange}
                        placeholder="Enter the password"
                        style={inputStyle}
                    />

                    <button
                        type="button"
                        style={forgotPasswordStyle}
                        onClick={() => alert("Redirect to Forgot Password page (not implemented yet).")}
                    >
                        Forgot Password?
                    </button>

                    <button type="submit" style={buttonStyle}>LOGIN</button>
                </form>
            </div>
            <footer style={footerStyle}>
                &copy; 2025 Food Founder. All rights reserved.
            </footer>
        </div>
    );
}
