import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();
  function handleLogOut() {
    axios
      .post("http://localhost:3001/logout")
      .then()
      .catch((err) => {
        console.log(err);
      });
    navigate("/home");
  }
  return (
    <nav className="navbar">
      <div className="logo">
        <a href="/home">
          {" "}
          <img
            className="logo-ico"
            src={require("../components/password-manager.png")}
            alt="C"
          />
        </a>
        <p>Password Manager</p>
      </div>

      <section className="button-section">
        <button
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </button>
        <button onClick={handleLogOut} className="nav-btn">
          Logout
        </button>
      </section>
    </nav>
  );
}
