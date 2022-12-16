import { createGlobalState } from 'react-hooks-global-state';

const { setGlobalState, useGlobalState } = createGlobalState({ username: 'my' });

export { setGlobalState, useGlobalState };