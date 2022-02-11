import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    signInWithEmailAndPassword,
    onAuthStateChanged,
    getAuth,
} from "firebase/auth";
import Firebase from "../firebase";
import "../css/Login.css";

export default function Login() {
    const [userInfo, setUserInfo] = useState({ email: "", password: "" });
    let navigate = useNavigate();

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (userAdmin) => {
            console.log(userAdmin);
        });
    });

    const redirectReg = () => {
        navigate("/register");
    };

    const redirectMain = () => {
        navigate("/contact");
    };

    const getInput = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
        console.log(userInfo);
    };

    const login = (e) => {
        e.preventDefault();
        console.log(userInfo);
        const auth = getAuth();

        try {
            signInWithEmailAndPassword(auth, userInfo.email, userInfo.password)
                .then((user) => {
                    console.log("Logged in with the following:");
                    console.log(user);
                    redirectMain();
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;

                    console.log("Log in failed");
                    console.log(errorCode);
                    console.log(errorMessage);
                });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="login">
            <div className="login-box">
                <div className="login-box-info">
                    <h1 className="login-box-title">Gradient App Manager</h1>
                    <h2 className="login-box-title">Login</h2>
                    <div className="login-box-email">
                        <input
                            className="login-text-input"
                            type="text"
                            placeholder="email"
                            name="email"
                            onChange={getInput}
                        ></input>
                    </div>
                    <div className="login-box-pass">
                        <input
                            className="login-text-input"
                            type="password"
                            placeholder="password"
                            name="password"
                            onChange={getInput}
                        ></input>
                    </div>
                    <div className="login-button-container">
                        <button className="login-button" onClick={login}>
                            <span className="login-button-text">Sign In</span>
                        </button>
                        <p className="login-account-question">
                            Don't have an account?
                        </p>
                        <button className="login-button" onClick={redirectReg}>
                            <span className="login-button-text">Register</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
