import { createGlobalState } from 'react-hooks-global-state';


const username = localStorage.getItem('globalUsername');
const { setGlobalState, useGlobalState } = createGlobalState({ username: 'iammy' || username });

export { setGlobalState, useGlobalState };