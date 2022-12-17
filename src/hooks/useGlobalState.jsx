import { createGlobalState } from 'react-hooks-global-state';

const { setGlobalState, useGlobalState } = createGlobalState({ username: 'hmyyy' });

export { setGlobalState, useGlobalState };