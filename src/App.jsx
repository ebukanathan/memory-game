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
  const [startgame, setStartgame] = useState(false);

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
    setStartgame(true);
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

  const bestscore = score > highest ? setHighest(score) : highest;
  const handleAddclick = (n) => {
    if (clickedcard.includes(n)) {
      console.log("game over");
      setModal(true);
      setStartgame(true);

      // setClickedcard([]);
    } else {
      const shuffledCard = shuffle(card);
      setCard(shuffledCard);
      setClickedcard([...clickedcard, n]);
      console.log(clickedcard);
      setScore((c) => c + 1);
    }
  };

  const restartGame = () => {
    setModal(false);
    setStartgame(false);
    setScore(0);
  };

  const derivedDiff = (n) => {
    let dff;
    if (n == 5) {
      dff = "easy";
    } else if (n == 10) {
      dff = "medium";
    } else {
      dff = "hard";
    }
    return dff;
  };

  // console.log(derivedDiff());
  return (
    <>
      {startgame ? (
        ""
      ) : (
        <div className="headcontainer">
          <h3 className="select">Select Difficulty</h3>
          <div className="diffbutton">
            <div className="h4 choose" onClick={() => handleDifficulty(5)}>
              easy
            </div>
            <div className="h4 choose" onClick={() => handleDifficulty(10)}>
              medium
            </div>
            <div className="h4 choose" onClick={() => handleDifficulty(20)}>
              hard
            </div>
          </div>

          <h2 className="h4" onClick={HandleStartGame}>
            Start Game
          </h2>
          <h2>level:{derivedDiff(difficulty)}</h2>
        </div>
      )}
      <div className="scores">
        <h2>Score:{score}</h2>

        <h2>Highest Score:{bestscore}</h2>
      </div>
      {score == difficulty ? (
        <Modal mode={"you won"} onClick={restartGame} />
      ) : (
        ""
      )}

      {modal && <Modal score={score} mode={"you lose"} onClick={restartGame} />}
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
