import styled from "styled-components";
import { useActor } from "@xstate/react";

import FooterControls from "../../components/FooterControls";
import { useRoundService } from "../../context/round";

type RoundResult = {
  word: string;
  count: number;
  teamId: string;
};

type ResultsProps = {
  handleSubmit: () => void;
};

const Results = ({ handleSubmit }: ResultsProps) => {
  const [state] = useActor(useRoundService());
  const { teams, turn } = state.context;

  const winnerId = "1";
  const items: RoundResult[] = [
    {
      word: "velocity",
      count: 1,
      teamId: "1",
    },
    {
      word: "accent",
      count: -1,
      teamId: "1",
    },
    {
      word: "accent",
      count: 1,
      teamId: "2",
    },
  ];

  return (
    <Container>
      <Title>Round results</Title>
      <Score>{teams[turn % (teams.length + 1)].totalScore}</Score>
      <TeamName>{teams[turn % (teams.length + 1)].name}</TeamName>
      <WordsList>
        {items.map((item, index) => (
          <div
            key={index}
            style={{ color: item.teamId === winnerId ? "black" : "red" }}
          >
            <div>{item.word}</div>
            <div>{item.count}</div>
          </div>
        ))}
      </WordsList>

      <TeamName>{teams[(turn + 1) % (teams.length + 1)].name}</TeamName>
      <Score style={{ color: "red" }}>{teams[(turn + 1) % (teams.length + 1)].totalScore}</Score>

      <FooterControls onClose={() => {}} onSubmit={handleSubmit} />
    </Container>
  );
};

export default Results;

const Title = styled.div`
  font-size: 20px;
  text-transform: uppercase;
`;
const WordsList = styled.div`
  width: 100%;

  & > div {
    margin: 10px 40px;
    display: flex;
    justify-content: space-between;
  }
`;
const Score = styled.div`
  font-size: 56px;
`;
const TeamName = styled.div`
  font-size: 20px;
`;
const Container = styled.div`
  display: flex;
  position: absolute;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
  padding-top: 60px;

  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
`;
