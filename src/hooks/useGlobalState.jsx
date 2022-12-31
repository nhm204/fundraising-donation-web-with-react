import { createGlobalState } from 'react-hooks-global-state';


const username = localStorage.getItem('globalUsername');
const { setGlobalState, useGlobalState } = createGlobalState({ username: null || username });

export { setGlobalState, useGlobalState };