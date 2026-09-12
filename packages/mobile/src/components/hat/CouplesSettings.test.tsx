import { fireEvent, render, screen } from '@testing-library/react-native';

import { CouplesSettings } from './CouplesSettings';

function renderCouples() {
  const onSubmit = jest.fn();

  render(
    <CouplesSettings
      onSubmit={onSubmit}
      onClose={jest.fn()}
    />,
  );

  return { onSubmit };
}

const nameField = () => screen.getByPlaceholderText(/^Couple \d+$/);
const startButton = () => screen.getByRole('button', { name: 'Start' });
const addButton = () => screen.getByRole('button', { name: 'Add a couple' });

function pressEnter(text: string) {
  fireEvent(nameField(), 'submitEditing', { nativeEvent: { text } });
}

function saveCaptain(name: string) {
  fireEvent.changeText(nameField(), name);
  fireEvent.press(addButton());
}

describe('CouplesSettings', () => {
  it('offers "Couple 1" already typed in for the first captain', () => {
    renderCouples();

    expect(screen.getByText('Captain of couple 1')).toBeOnTheScreen();
    expect(screen.getByDisplayValue('Couple 1')).toBeOnTheScreen();
    expect(startButton()).toBeDisabled();
  });

  it('saves the suggested name on Enter and moves on to the next couple', () => {
    renderCouples();

    pressEnter('Couple 1');

    expect(screen.getByText('1. Couple 1')).toBeOnTheScreen();
    expect(screen.getByText('Captain of couple 2')).toBeOnTheScreen();
    expect(screen.getByDisplayValue('Couple 2')).toBeOnTheScreen();
  });

  it('saves the name the field holds, even if the last render lagged behind', () => {
    renderCouples();

    fireEvent.changeText(nameField(), 'A');
    pressEnter('Anya');

    expect(screen.getByText('1. Anya')).toBeOnTheScreen();
  });

  it('falls back to the suggested name when the field is cleared', () => {
    renderCouples();

    fireEvent.changeText(nameField(), '');
    pressEnter('');

    expect(screen.getByText('1. Couple 1')).toBeOnTheScreen();
  });

  it('saves the typed name with the + button', () => {
    renderCouples();

    saveCaptain('Anya');

    expect(screen.getByText('1. Anya')).toBeOnTheScreen();
    expect(screen.getByDisplayValue('Couple 2')).toBeOnTheScreen();
  });

  it('keeps Start disabled until two couples are saved, even with a name typed', () => {
    renderCouples();
    saveCaptain('Anya');

    fireEvent.changeText(nameField(), 'Borya');
    expect(startButton()).toBeDisabled();

    fireEvent.press(addButton());
    expect(startButton()).toBeEnabled();
  });

  it('starts with the saved captains only, leaving an unsaved name out', () => {
    const { onSubmit } = renderCouples();
    saveCaptain('Anya');
    saveCaptain('Borya');

    fireEvent.changeText(nameField(), 'Vera');
    fireEvent.press(startButton());

    expect(onSubmit).toHaveBeenCalledWith(['Anya', 'Borya']);
  });
});
