import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dob, setDob] = useState("");
    const [email, setemail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const formStyle = {
        width: "600px",
        margin: "100px auto",
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
        backgroundColor:"lightgreen",
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
    }

    function handleSubmit(event) {
        event.preventDefault();

        if (
            !firstName.trim() ||
            !lastName.trim() ||
            !dob ||
            !email.trim() ||
            !username.trim() ||
            !password ||
            !confirmPassword ||
            password !== confirmPassword
        ) {
            alert("Please fill in all the fields correctly.");
            return;
        }

        // Proceed with form submission logic


        const user = {
            firstName,
            lastName,
            dob,
            email,
            username,
            password
        };

        // Save to localStorage
        axios.post('http://localhost:5000/register', user)
            .then(response => {
                alert(response.data.message || "User registered successfully!");
                // Reset form fields
                setFirstName("");
                setLastName("");
                setDob("");
                setemail("");
                setUsername("");
                setPassword("");
                setConfirmPassword("");
                navigate("/Login");
            })
            .catch(error => {
                console.error("Registration error:", error);
                const msg = error.response?.data?.message || "Registration failed.";
                alert(msg);
                if (msg.toLowerCase().includes("user already exists")) {
                    navigate("/Login");
                }

            });
    }


    return (
        <div style={containerStyle}>
            <div style={contentWrapperStyle}>
                <form onSubmit={handleSubmit} style={formStyle}>
                    <h1 style={headingStyle}>REGISTER FORM</h1>

                    <label>First Name</label>
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Enter your first name"
                        style={inputStyle}
                    />

                    <label>Last Name</label>
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Enter your last name"
                        style={inputStyle}
                    />

                    <label>Date of Birth</label>
                    <input
                        type="date"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        style={inputStyle}
                    />

                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                        placeholder="Enter your Email"
                        style={inputStyle}
                    />

                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username"
                        style={inputStyle}
                    />

                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        style={inputStyle}
                    />

                    <label>Confirm Password</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm your password"
                        style={inputStyle}
                    />

                    <button type="submit" style={buttonStyle}>REGISTER</button>
                    <p style={{ marginTop: '10px', textAlign: 'center' }}>
                        Already registered? <Link to="/Login">Click here to login</Link>
                    </p>

                </form>
            </div>
            <footer style={footerStyle}>
                &copy; 2025 Food Founder. All rights reserved.
            </footer>
        </div>
    );
}
