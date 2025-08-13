import React from "react";

function Card({ src, name, onClick }) {
  return (
    <div className="cardcontainer" onClick={onClick}>
      <div className="image-container">
        <img src={src} alt="" width="100%" height="100%" className="image" />
      </div>
      <h1>{name}</h1>
    </div>
  );
}

export default Card;
