import React from "react";
import Typewriter from "typewriter-effect";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <section className="home-container">
        <h1 style={{ fontSize: "4.3em" }}>
          Save your
          <br />
          PASSWORDS <br />{" "}
          <span className="typewrite">
            <Typewriter
              options={{
                strings: ["from everyone.", "even from YOURSELVES!.."],
                autoStart: true,
                loop: true,
                deleteSpeed: 10,
              }}
            />
          </span>
        </h1>
      </section>

      <section>
        <h1>About this project</h1>
        <p className="about-p">
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum."
        </p>
        <img alt="pic" src={require("../pages/components/pic1.jpg")} />
      </section>
      <section>
        <h1>Guide</h1>
        <p>
          As for a New User, you can register with your details and create an
          account on this fabulous website. Then every time you want to check or
          change your passwords, you must log in with your details(Username and
          Secure Password). It will direct you to the page with all your
          passwords where you can add more passwords or edit and also delete
          them.
        </p>
        <br />

        <h3>Get starterd Now by craeting an account </h3>
        <button onClick={() => navigate("/register")}>Create Account</button>
      </section>
      <footer>&copy; 2023 DIY</footer>
    </div>
  );
}
