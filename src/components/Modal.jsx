import React from "react";

function modal({ onClick, score }) {
  return (
    <div className="modalbody" onClick={onClick}>
      <h2 className="modalcontent">Game Over oooooooo</h2>
      <h3>score:{score}</h3>
      <button onClick={onClick}>Restart</button>
    </div>
  );
}

export default modal;
