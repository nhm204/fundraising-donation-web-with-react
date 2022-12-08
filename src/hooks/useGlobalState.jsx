import { createGlobalState } from 'react-hooks-global-state';

const { setGlobalState, useGlobalState } = createGlobalState({ username: null });

export { setGlobalState, useGlobalState };