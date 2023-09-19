import {useNavigate, useParams} from "react-router-dom";
import styled from "styled-components";
import FooterControls from "../components/FooterControls";

const Results = () => {
  const { id } = useParams();
  const winnerId = "1";
  const navigate = useNavigate();
  const items = [
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
    <Container
      onClick={() => {
        // navigate("/round/1");
      }}
    >
      <Title>Round results</Title>
      <Score>+1</Score>
      <TeamName>Team first</TeamName>
      <WordsList>
        {items.map((item) => (
          <div style={{ color: item.teamId === winnerId ? "black" : "red" }}>
            <div>{item.word}</div>
            <div>{item.count}</div>
          </div>
        ))}
      </WordsList>

      <TeamName>Team second</TeamName>
      <Score style={{ color: "red" }}>+1</Score>

      <FooterControls
        onClose={() => {}}
        onSubmit={() => {
          navigate(`/round/${+id+1}`);
        }}
      />
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
