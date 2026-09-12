import { createActor } from 'xstate';

import { LEVELS } from '../enums/settings';
import { createSettingsMachine, SCORE_LIMITS, TIME_LIMITS } from './settings';

const defaults = {
  level: LEVELS.easy,
  time: 60,
  score: 30,
  teams: ['A', 'B'],
};

function startSettings(scoreLimits?: { min: number; max: number }) {
  const machine = createSettingsMachine('test', defaults, scoreLimits);
  return createActor(machine).start();
}

describe('createSettingsMachine', () => {
  it('accepts a score within the limits', () => {
    const actor = startSettings();

    actor.send({ type: 'OPEN_SCORE_SETTINGS' });
    actor.send({ type: 'SUBMIT_SCORE', value: SCORE_LIMITS.max });

    const snapshot = actor.getSnapshot();
    expect(snapshot.context.score).toBe(SCORE_LIMITS.max);
    expect(snapshot.value).toBe('generalSettings');
  });

  it('rejects a score outside the limits and stays on the screen', () => {
    const actor = startSettings();

    actor.send({ type: 'OPEN_SCORE_SETTINGS' });
    actor.send({ type: 'SUBMIT_SCORE', value: SCORE_LIMITS.max + 1 });

    const snapshot = actor.getSnapshot();
    expect(snapshot.context.score).toBe(defaults.score);
    expect(snapshot.value).toBe('scoreSettings');
  });

  it('uses the custom score limits Hat passes for its word count', () => {
    const actor = startSettings({ min: 10, max: 40 });

    actor.send({ type: 'OPEN_SCORE_SETTINGS' });
    actor.send({ type: 'SUBMIT_SCORE', value: 40 });
    expect(actor.getSnapshot().context.score).toBe(40);

    actor.send({ type: 'OPEN_SCORE_SETTINGS' });
    actor.send({ type: 'SUBMIT_SCORE', value: 41 });
    expect(actor.getSnapshot().context.score).toBe(40);
  });

  it('rejects a time outside the limits', () => {
    const actor = startSettings();

    actor.send({ type: 'OPEN_TIME_SETTINGS' });
    actor.send({ type: 'SUBMIT_TIME', value: TIME_LIMITS.min - 1 });

    const snapshot = actor.getSnapshot();
    expect(snapshot.context.time).toBe(defaults.time);
    expect(snapshot.value).toBe('timeSettings');
  });

  it('returns to the general screen from anywhere on BACK', () => {
    const actor = startSettings();

    actor.send({ type: 'OPEN_TEAM_SETTINGS' });
    actor.send({ type: 'BACK' });

    expect(actor.getSnapshot().value).toBe('generalSettings');
  });

  it('updates the level and the team list', () => {
    const actor = startSettings();

    actor.send({ type: 'OPEN_LEVEL_SETTINGS' });
    actor.send({ type: 'SUBMIT_LEVEL', value: LEVELS.pro });

    actor.send({ type: 'OPEN_TEAM_SETTINGS' });
    actor.send({ type: 'SUBMIT_TEAMS', value: ['X', 'Y', 'Z'] });

    const context = actor.getSnapshot().context;
    expect(context.level).toBe(LEVELS.pro);
    expect(context.teams).toEqual(['X', 'Y', 'Z']);
  });
});
