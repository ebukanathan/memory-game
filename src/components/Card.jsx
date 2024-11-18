import React from "react";

function Card({ src, name, onClick }) {
  return (
    <div className="cardcontainer" onClick={onClick}>
      <img src={src} alt="" height={200} width={200} />
      <h1>{name}</h1>
    </div>
  );
}

export default Card;
