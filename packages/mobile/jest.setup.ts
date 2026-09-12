import { TextInput } from 'react-native';
import 'react-native-gesture-handler/jestSetup';

import '@/i18n';

// Node already has Intl.PluralRules: the polyfill is only for Hermes, and it
// ships as ESM that Jest would otherwise have to transform.
jest.mock('@formatjs/intl-pluralrules/polyfill-force.js', () => ({}));
jest.mock('@formatjs/intl-pluralrules/locale-data/en.js', () => ({}));
jest.mock('@formatjs/intl-pluralrules/locale-data/ru.js', () => ({}));

jest.mock('react-native-reanimated', () =>
  jest.requireActual('react-native-reanimated/mock'),
);
jest.mock('react-native-worklets', () =>
  jest.requireActual('react-native-worklets/lib/module/mock'),
);

// React Native's TextInput mock has no setSelection, which the couple editor
// calls to preselect the suggested name.
(
  TextInput as unknown as { prototype: Record<string, unknown> }
).prototype.setSelection = jest.fn();
