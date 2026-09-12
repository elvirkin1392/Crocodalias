import { fireEvent, render, screen } from '@testing-library/react-native';
import { Text } from 'react-native';

import { CrocodileContext } from '@/context/crocodile';
import { crocodileMachine } from '@/state/crocodile';
import { CrocodilePlay } from './CrocodilePlay';

const gameInProgress = crocodileMachine.resolveState({
  value: 'playing',
  context: { words: ['fox', 'owl'], wordIndex: 0, shownWords: [] },
});

/** The screen above CrocodilePlay switches on the machine state; this shows it. */
function GameState() {
  const value = CrocodileContext.useSelector((state) => String(state.value));

  return <Text testID="game-state">{value}</Text>;
}

function renderPlay() {
  render(
    <CrocodileContext.Provider options={{ snapshot: gameInProgress }}>
      <CrocodilePlay />
      <GameState />
    </CrocodileContext.Provider>,
  );
}

const pauseButton = () => screen.getByRole('button', { name: 'Pause' });

describe('CrocodilePlay', () => {
  it('shows the word to act out with the gestures-only rule', () => {
    renderPlay();

    expect(screen.getByText('fox')).toBeOnTheScreen();
    expect(
      screen.getByText(
        'Act the word out using only gestures — no talking or sounds',
      ),
    ).toBeOnTheScreen();
  });

  it('hides the word on pause and offers to resume or finish', () => {
    renderPlay();

    fireEvent.press(pauseButton());

    expect(screen.queryByText('fox')).not.toBeOnTheScreen();
    expect(screen.getByRole('button', { name: 'Resume' })).toBeOnTheScreen();
    expect(
      screen.getByRole('button', { name: 'Finish the game' }),
    ).toBeOnTheScreen();
  });

  it('brings the same word back on resume', () => {
    renderPlay();

    fireEvent.press(pauseButton());
    fireEvent.press(screen.getByRole('button', { name: 'Resume' }));

    expect(screen.getByText('fox')).toBeOnTheScreen();
    expect(screen.getByTestId('game-state')).toHaveTextContent('playing');
  });

  it('finishes the game from the pause screen', () => {
    renderPlay();

    fireEvent.press(pauseButton());
    fireEvent.press(screen.getByRole('button', { name: 'Finish the game' }));

    expect(screen.getByTestId('game-state')).toHaveTextContent('finished');
  });
});
