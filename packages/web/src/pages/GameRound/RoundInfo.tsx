import { useActor } from "@xstate/react";

import { Container2, RoundTitle, TeamName, TeamScore } from "../styled/round";
import FooterControls from "../../components/FooterControls";
import { useRoundService } from "../../context/round";

type RoundInfoProps = {
  handleSubmit: () => void;
};

const RoundInfo = ({ handleSubmit }: RoundInfoProps) => {
  const [state] = useActor(useRoundService());
  const { teams, round } = state.context;

  return (
    <Container2>
      <TeamScore>{teams[0]?.totalScore}</TeamScore>
      <TeamName>{teams[0]?.name} </TeamName>
      <RoundTitle>Round {round}</RoundTitle>
      <TeamName>{teams[1]?.name} </TeamName>
      <TeamScore>{teams[1]?.totalScore}</TeamScore>

      <FooterControls onClose={() => {}} onSubmit={handleSubmit} />
    </Container2>
  );
};

export default RoundInfo;
