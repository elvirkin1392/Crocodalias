import { Time } from "../styled/round";

export const Timer = ({ value, onStart, onPause }) => {
  const { elapsed, duration, isPaused } = value;

  return (
    <Time onClick={isPaused ? onStart : onPause}>
      {duration - elapsed.toFixed(0)}
    </Time>
  );
};
