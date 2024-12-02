import React from "react";

function modal({ onClick, score, mode }) {
  return (
    <div className="modalbody" onClick={onClick}>
      <h2 className="modalcontent">{mode}</h2>
      <h3>score:{score}</h3>
      <button onClick={onClick}>Restart</button>
    </div>
  );
}

export default modal;
