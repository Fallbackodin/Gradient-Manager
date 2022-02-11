import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Firebase from "../firebase";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import "../css/Register.css";

export default function Register() {
    const [userInfo, setUserInfo] = useState({ email: "", password: "" });
    let navigate = useNavigate();

    const redirectLogin = () => {
        navigate("/");
    };

    const getInput = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
        console.log(userInfo);
    };

    const handleRegister = (e) => {
        e.preventDefault();
        console.log(userInfo);
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, userInfo.email, userInfo.password)
            .then((user) => {
                console.log("Created new user!");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                console.log("Register failed");
                console.log(errorCode);
                console.log(errorMessage);
            });

        console.log("Create new user!");
    };

    return (
        <div className="register">
            <div className="register-box">
                <div className="register-box-info">
                    <h1 className="register-box-title">Register</h1>
                    <div className="register-box-input">
                        <input
                            className="register-box-input-style"
                            type="text"
                            placeholder="email"
                            name="email"
                            onChange={getInput}
                        ></input>
                    </div>
                    <div className="register-box-input">
                        <input
                            className="register-box-input-style"
                            type="text"
                            placeholder="password"
                            name="password"
                            onChange={getInput}
                        ></input>
                    </div>
                    <div>
                        <button onClick={handleRegister}>Register</button>
                        <h3>Have an account? Login!</h3>
                        <button onClick={redirectLogin}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
