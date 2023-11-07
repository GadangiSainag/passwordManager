import React from "react";

export default function LabelInput(props) {
  return (
    <div className="group">
      <input
        name={props.string.toLowerCase()}
        required={props.required}
        type={props.type}
        className="input"
        onChange={props.onChange}
      ></input>
      <span className="highlight"></span>
      <span className="bar"></span>
      <label className="custom-label">{props.string}</label>
    </div>
  );
}
