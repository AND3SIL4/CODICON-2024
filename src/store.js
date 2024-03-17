import { atom } from 'nanostores';

export const state = atom(null);
export function changeState(newState) {
  state.set(newState);
  console.log(state.get());
}
