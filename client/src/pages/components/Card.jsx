import React, { useState } from "react";
// import "../components/card.module.css";
// import "../components/card.css"
import { FaTrash, FaEdit, FaEye, FaEyeSlash } from "react-icons/fa";

export default function Card(props) {
  const [isHidden, setView] = useState(true);

  function setViewProp() {
    return isHidden ? setView(false) : setView(true);
  }

  function deleteCard() {
    props.onDelete(props.site._id);
  }

  function editDetails() {
    props.onEdit(props.site);
  }

  return (
    <div className="cartoon-card">
      <div className="card-content">
        <strong className="siteURL">{props.site.siteURL}</strong>
        <br />
        <p className="p-card">{props.site.siteUsrName}</p>
        <p className="p-card">{isHidden ? "*****" : props.site.sitePassword}</p>
        <button onClick={setViewProp}>
          {isHidden ? <FaEye color="white" /> : <FaEyeSlash color="white" />}
        </button>
        <button onClick={editDetails}>
          <FaEdit color="white" size="15px" />
        </button>
        <button onClick={deleteCard}>
          <FaTrash color="white" size="15px" />
        </button>
      </div>
    </div>
  );
}
