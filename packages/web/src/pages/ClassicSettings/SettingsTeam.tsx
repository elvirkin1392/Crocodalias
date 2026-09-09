import { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Container } from "../styled/general";
import { Title } from "../styled/settingsGeneral";
import FooterControls from "../../components/FooterControls";
import { getRandomTeams } from "../../mocks/teams";

type SettingsTeamProps = {
  defaultValue: string[];
  title: ReactNode;
  onSubmit: (value: string[]) => void;
  onClose: () => void;
};

const SettingsTeam = ({
  onSubmit,
  onClose,
  title,
  defaultValue,
}: SettingsTeamProps) => {
  const navigate = useNavigate();
  const [teams, setTeams] = useState(
    getRandomTeams(defaultValue && defaultValue.length)
  );

  return (
    <Container>
      <Title>{title}: Teams</Title>
      {teams.map((item, index) => {
        if (index > 1) {
          return (
            <div
              style={{ textAlign: "center", marginBottom: "10px" }}
              key={index}
            >
              <button
                onClick={() => {
                  const updatedTeams = [...teams];
                  updatedTeams.splice(index, 1);
                  setTeams(updatedTeams);
                }}
              >
                -
              </button>
              <div>Team {item}</div>
            </div>
          );
        }
        return (
          <div style={{ marginBottom: "10px" }} key={index}>
            Team {item}
          </div>
        );
      })}

      <button
        onClick={() => {
          setTeams([...teams, ...getRandomTeams(1)]);
        }}
      >
        +
      </button>

      <FooterControls
        onClose={onClose}
        onSubmit={() => {
          onSubmit(teams);
          navigate("round/1");
        }}
      />
    </Container>
  );
};

export default SettingsTeam;
