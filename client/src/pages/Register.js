/* eslint-disable eqeqeq */
import React, { useState } from "react";
import LabelInput from "./components/Label";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import  "../loginPage/login.css";

function Register() {
  const navigate = useNavigate();
  const [userName, setName] = useState("");
  const [userEmail, setEmail] = useState("");
  const [userPassword, setPassword] = useState("");
  const [prompt, setPrompt] = useState("                ");

  const handleRegister = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/register", {
        userName,
        userEmail,
        userPassword,
      })
      .then((response) => {
        console.log(response);
        if (response.data == "ALREADY_EXISTS") {
          setPrompt("Username already in existance.");
        } else {
          navigate("/login");
        }
      })
      .catch((err) => console.log(err.message));

    //
  };
  return (
    <div>
      <div className="screen">
        <div className="container-form">
          <h1>Register New User</h1>
          <form action="/register" id="registerForm" onSubmit={handleRegister}>
            <LabelInput
              string="Username"
              type="text"
              required={true}
              onChange={(e) => setName(e.target.value)}
            />
            <LabelInput
              string="Email"
              type="email"
              required={true}
              onChange={(e) => setEmail(e.target.value)}
            />
            <LabelInput
              string="Password"
              type="password"
              required={true}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p style={{ color: "red" }}>{prompt}</p>
            <button type="submit">Register</button>
          </form>
          <p>
            Already got an account? <a href="/login">Login</a>
          </p>
        </div>
      </div>
      <footer>&copy; 2023 DIY</footer>
    </div>
  );
}

export default Register;
