import { fireEvent, render, screen } from '@testing-library/react-native';

import { CrocodileContext } from '@/context/crocodile';
import { crocodileMachine } from '@/state/crocodile';
import { CrocodileResults } from './CrocodileResults';

const finishedGame = crocodileMachine.resolveState({
  value: 'finished',
  context: {
    words: ['fox', 'owl', 'cat'],
    wordIndex: 2,
    shownWords: [
      { word: 'fox', result: 'guessed' },
      { word: 'owl', result: 'skipped' },
    ],
  },
});

function renderResults() {
  const onClose = jest.fn();

  render(
    <CrocodileContext.Provider options={{ snapshot: finishedGame }}>
      <CrocodileResults onClose={onClose} />
    </CrocodileContext.Provider>,
  );

  return { onClose };
}

describe('CrocodileResults', () => {
  it('counts the guessed words out of every word shown', () => {
    renderResults();

    expect(screen.getByText('Guessed 1 of 2')).toBeOnTheScreen();
  });

  it('lists every shown word and marks only the skipped ones', () => {
    renderResults();

    expect(screen.getByText('fox')).toBeOnTheScreen();
    expect(screen.getByText('owl')).toBeOnTheScreen();
    expect(screen.getAllByText('skipped')).toHaveLength(1);
  });

  it('closes on Done', () => {
    const { onClose } = renderResults();

    fireEvent.press(screen.getByRole('button', { name: 'Done' }));

    expect(onClose).toHaveBeenCalled();
  });
});
