import { useState } from "react";
import { motion, useAnimate } from "framer-motion";

import playIcon from "../../assets/play.svg";
import { CardBack, CardFace } from "../styled/round";
import { useNavigate } from "react-router-dom";

const words = [
  "velocity",
  "accent",
  "time",
  "code",
  "magazine",
  "pocket",
  "trauma",
  "ball",
  "snack",
  "mushroom",
  "all",
  "velocity",
  "accent",
  "time",
  "code",
  "magazine",
  "pocket",
  "trauma",
  "ball",
  "snack",
  "mushroom",
  "all",
];

const Cards = ({
  setScore,
  score,
  isPaused,
  handlePlay,
  isTimerUp,
  competitorScore,
  setCompetitorScore,
}) => {
  const [scope, animate] = useAnimate();
  const [newCard, animateNewCard] = useAnimate();
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  function sequence(direction) {
    switch (direction) {
      case "up":
        animate([[scope.current, { y: -1000 }]]);
        break;
      case "down":
        animate([[scope.current, { y: 1000 }]]);
        break;
      case "left":
        animate([[scope.current, { x: -400 }]]);
        break;
    }

    if (isTimerUp) {
      setTimeout(() => {
        navigate("/results");
      }, 500);
    }

    animateNewCard([[newCard.current, { x: 0 }]]);
    setTimeout(() => {
      setCount(count + 1);
    }, 500);
  }

  return (
    <div
      style={{
        justifyContent: "center",
        position: "relative",
        alignSelf: "normal",
        display: "flex",
      }}
    >
      <motion.div
        key={count}
        style={{ zIndex: 2, position: "absolute" }}
        ref={scope}
        drag={!isPaused}
        dragDirectionLock
        dragConstraints={isTimerUp ? { right: 0 } : { right: 0, top: 0 }}
        onDragEnd={(event, info) => {
          if (Math.abs(info.offset.y) > Math.abs(info.offset.x)) {
            if (isTimerUp && info.offset.y < -5) {
              sequence("up");
              setCompetitorScore(competitorScore + 1);
            } else if (info.offset.y > 5) {
              sequence("down");
              setScore(score + 1);
            }
          } else if (info.offset.x < -5) {
            sequence("left");
            setScore(score - 1);
          }
        }}
      >
        <CardBack onClick={handlePlay}>
          {!isPaused ? (
            <CardFace>{words[count]}</CardFace>
          ) : (
            <img
              src={playIcon}
              style={{
                alignSelf: "center",
                paddingLeft: "15px",
              }}
            />
          )}
        </CardBack>
      </motion.div>

      {!isTimerUp && (
        <motion.div
          style={{ position: "absolute" }}
          initial={{ x: 300 }}
          key={count + 1}
          ref={newCard}
        >
          <CardBack onClick={handlePlay} style={{ background: "red" }}>
            <CardFace>{words[count + 1]}</CardFace>
          </CardBack>
        </motion.div>
      )}
    </div>
  );
};

export default Cards;
