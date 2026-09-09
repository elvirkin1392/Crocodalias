import { Time } from "../styled/round";
import type { TimerContext } from "../../state/timer";

type TimerProps = {
  value: TimerContext;
  onStart: () => void;
  onPause: () => void;
};

export const Timer = ({ value, onStart, onPause }: TimerProps) => {
  const { elapsed, duration, isPaused } = value;

  return (
    <Time onClick={isPaused ? onStart : onPause}>
      {duration - Number(elapsed.toFixed(0))}
    </Time>
  );
};
