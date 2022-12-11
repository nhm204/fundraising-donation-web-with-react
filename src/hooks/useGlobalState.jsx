import { createGlobalState } from 'react-hooks-global-state';

const { setGlobalState, useGlobalState } = createGlobalState({ username: 'iammy' });

export { setGlobalState, useGlobalState };