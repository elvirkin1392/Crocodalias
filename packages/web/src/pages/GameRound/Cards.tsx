import { useState } from "react";
import styled from "styled-components";
import { motion, useAnimate } from "framer-motion";

import playIcon from "../../assets/play.svg";
import { CardBack, CardFace } from "../styled/round";
import {useNavigate, useParams} from "react-router-dom";


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
  const { id } = useParams();
  const [scope, animate] = useAnimate();
  const [newCard, animateNewCard] = useAnimate();
  const [count, setCount] = useState(0);
  const [isShowTime, setShowTime] = useState(false);
  const navigate = useNavigate();

  function sequence(direction) {
    switch (direction) {
      case "up":
        animate([
          [scope.current, { y: -1000 }],
          [scope.current, { opacity: 0 }, { duration: 0 }],
          [scope.current, { y: 0 }, { duration: 0 }],
        ]);
        break;
      case "down":
        animate([
          [scope.current, { y: 1000 }],
          [scope.current, { opacity: 0 }, { duration: 0 }],
          [scope.current, { y: 0 }, { duration: 0 }],
        ]);

        break;
      case "left":
        animate([
          [scope.current, { x: -400 }],
          [scope.current, { opacity: 0 }, { duration: 0 }],
          [scope.current, { x: 0 }, { duration: 0 }],
        ]);
        break;
    }

    if (!isTimerUp) {
      setCount(count + 1);
      animateNewCard([
        [newCard.current, { x: 0 }],
        [newCard.current, { opacity: 0 }, { duration: 0 }],
        [newCard.current, { x: 300 }, { duration: 0 }],
      ]);
      animate([[scope.current, { opacity: 100 }, { duration: 0 }]]);
      animateNewCard([[newCard.current, { opacity: 100 }, { duration: 0 }]]);
    } else {
      setShowTime(true);
      setTimeout(() => {
        navigate(`/results/${id}`);
      }, 2000);
    }
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
              alt="play"
              src={playIcon}
              style={{
                alignSelf: "center",
                paddingLeft: "15px",
              }}
            />
          )}
        </CardBack>
      </motion.div>

      {isShowTime && (
        <Container>
          <div>Show time </div>
          🎊 🎉 🐊
        </Container>
      )}

      {!isTimerUp && (
        <motion.div
          style={{ position: "absolute" }}
          initial={{ x: 300 }}
          ref={newCard}
        >
          <CardBack onClick={handlePlay} style={{ background: "red" }}>
            <CardFace>{words[count]}</CardFace>
          </CardBack>
        </motion.div>
      )}
    </div>
  );
};

export default Cards;
const Container = styled.div`
  font-size: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 85vh;
`;
