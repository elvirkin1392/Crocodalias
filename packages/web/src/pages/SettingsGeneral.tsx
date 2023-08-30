import {useMachine} from "@xstate/react";
import {settingsMachine} from "../state/settingsPage";
import {useState} from "react";


const SettingsGeneral = () => {
  const [state, send] = useMachine(settingsMachine);
  let {score, level, time} = state.context;


  return (
    <div>
      Alias

      <button onClick={() => {
        send({type: "OPEN_SCORE_SETTINGS"})
      }}>score {score}</button>

      <button onClick={() => {
        send({type: "OPEN_LEVEL_SETTINGS"})
      }}>Level {level}</button>

      <button onClick={() => {
        send({type: "OPEN_TIME_SETTINGS"})
      }}>time {time}</button>


      {state.matches('scoreSettings') && <ScoreSettings defaultValue={score} onSubmit={(value) => {
        send({type: "SUBMIT_SCORE", value})
      }} onClose={() => {
        send({type: "BACK"})
      }}/>}
    </div>
  );
};

const ScoreSettings = ({defaultValue, onSubmit, onClose}: { defaultValue: number }) => {
  const [score, setScore] = useState(defaultValue)
  return (
    <div>
      <input type="range" min={10} max={100} value={score} onChange={(event) => {
        setScore(Number(event.target.value))
      }}/>
      <button onClick={() => onSubmit(score)}>✅</button>
      <button onClick={() => onClose(score)}>❌</button>
    </div>
  )
}


export default SettingsGeneral;