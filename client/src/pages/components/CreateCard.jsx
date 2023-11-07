import React, { useEffect, useState } from "react";
// import "../components/createCard.css";

export default function CreateCard(props) {
  const [newURL, setNewSite] = useState({
    url: "",
    username: "",
    password: "",
  });
  const [onEdit, setEditToggle] = useState(false);

  function addSite(e) {
    e.preventDefault();
    props.addFunc(newURL);
    setNewSite({
      url: "",
      username: "",
      password: "",
    });
  }

  useEffect(() => {
    if (props.onEdit) {
      setNewSite({
        url: props.addEditItem.siteURL,
        username: props.addEditItem.siteUsrName,
        password: props.addEditItem.sitePassword,
      });
      setEditToggle(false);
    }
  }, [props.onEdit, props.addEditItem, onEdit]);

  function handleTextChange(event) {
    const { name, value } = event.target;
    setNewSite((prevSites) => {
      return { ...prevSites, [name]: value };
    });
  }

  return (
    <div className="card">
      <form className="form-cc" onSubmit={addSite}>
        <input
          // required={true}
          name="url"
          onChange={handleTextChange}
          placeholder="Site URL"
          type="url"
          value={newURL.url}
        />

        <input
          // required={true}
          name="username"
          onChange={handleTextChange}
          placeholder="Username or Email"
          type="text"
          value={newURL.username}
        ></input>
        <input
          // required={true}
          name="password"
          onChange={handleTextChange}
          placeholder="Password"
          type="text"
          value={newURL.password}
        ></input>

        <button type="submit">+</button>
      </form>
    </div>
  );
}
