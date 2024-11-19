import React, { useEffect, useState } from "react";
import Card from "./components/Card";
import "./App.css";
import Modal from "./components/Modal";

function App() {
  const [score, setScore] = useState(0);
  const [highest, setHighest] = useState(0);
  const [card, setCard] = useState([]);
  const [clickedcard, setClickedcard] = useState([]);
  const [difficulty, setDifficulty] = useState();
  const [modal, setModal] = useState(false);

  // const handleClick = () => {
  //   setScore((c) => c + 1);

  //   if (score > highest) {
  //     return setHighest(highest + 1);
  //   } else {
  //     return highest;
  //   }
  // };

  const handleDifficulty = (n) => {
    setDifficulty(n);
    console.log(difficulty);
  };

  const getCard = async (difficulty) => {
    try {
      fetch(`https://dragonball-api.com/api/characters?limit=${difficulty}`)
        .then((res) => res.json())
        .then((data) => setCard(data.items));
      console.log(card);
    } catch (err) {
      console.log("this is the error" + err);
    }
  };

  const HandleStartGame = () => {
    getCard(difficulty);
  };

  function shuffle(array) {
    // Iterate over the array in reverse order
    for (let i = array.length - 1; i > 0; i--) {
      // Generate Random Index
      const j = Math.floor(Math.random() * (i + 1));

      // Swap elements
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // useEffect(() => {
  //   getCard();
  // }, []);

  const handleAddclick = (n) => {
    if (clickedcard.includes(n)) {
      console.log("game over");
      setModal(true);

      setClickedcard([]);
    } else {
      const shuffledCard = shuffle(card);
      setCard(shuffledCard);
      setClickedcard([...clickedcard, n]);
      console.log(clickedcard);
    }
  };

  return (
    <>
      <h3>Select Difficulty</h3>
      <div className="h4" onClick={() => handleDifficulty(5)}>
        easy
      </div>
      <div className="h4" onClick={() => handleDifficulty(10)}>
        medium
      </div>
      <div className="h4" onClick={() => handleDifficulty(20)}>
        hard
      </div>
      <h2 onClick={HandleStartGame}>Start Game</h2>
      <h2>Score:{clickedcard.length}</h2>
      <h2>Highest Score:{highest}</h2>
      {modal && <Modal score={score} />}
      <div className="container">
        {card.map((item, index) => (
          <Card
            key={index}
            src={item.image}
            name={item.name}
            onClick={() => handleAddclick(item)}
          />
        ))}
      </div>
    </>
  );
}

export default App;