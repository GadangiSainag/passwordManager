/* eslint-disable eqeqeq */
// eslint-disable eqeqeq
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import React, { useState } from "react";
import axios from "axios";
import LabelInput from "./components/Label";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [userName, setName] = useState("");
  const [userPassword, setPassword] = useState("");
  const [prompt, setPrompt] = useState("                    ");
  function handleLogin(e) {
    e.preventDefault();
    axios
      .post("http://localhost:3001/login", { userName, userPassword })
      .then((result) => {
        if (result.data == "404") {
          //user not exists
          setPrompt("This username is not in our records.");
        } else {
          //user exists
          // eslint-disable-next-line eqeqeq
          if (result.data == "WRONG") {
            //wrong pass
            setPrompt("Wrong password!!");
          } else {
            //correct user
            console.log("login successful");

            navigate("/passwords");
            
          }
        }
        // console.log("login successful")
      })
      .catch((err) => console.log(err.message));
  }

  return (
    <div>
      <div className="screen">
        <div className="container-form">
          <h1>User Login</h1>
          <form action="/login" method="POST" onSubmit={handleLogin}>
            <LabelInput
              string="Username"
              type="text"
              required={true}
              onChange={(e) => setName(e.target.value)}
            />
            <LabelInput
              string="Password"
              type="password"
              required={true}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p style={{ color: "red" }}>{prompt}</p>
            <button type="submit">Login</button>
          </form>
          <p style={{ margin: "1.7rem 0px 0px 0px" }}>
            New Here? <a href="/register">Click here</a>
          </p>
        </div>
      </div>
      <ToastContainer />
      <footer>&copy; 2023 DIY</footer>
    </div>
  );
}

export default Login;
