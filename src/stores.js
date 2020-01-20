import { writable, derived } from 'svelte/store';
import { toJSON, genOptions } from './u.js';

let qDex = new URLSearchParams(location.search).get('pm');

export const defaultDex = 371;
export const dex = writable(qDex || defaultDex);

export const pokemon = writable([]);
export const moves = writable([]);
export const listview = writable(true);
console.log('store');


export const gmUrl = 'gm.json' || 'https://cors-anywhere.herokuapp.com/https://pvpoketw.com/data/gamemaster.json?v=206';

fetch(gmUrl)
.then(toJSON)
.then(d => {
  console.log('gm done:', d);
  pokemon.set(d.pokemon);
  moves.set(d.moves);
});

export const datalist = derived(
  pokemon,
  $pokemon =>
    $pokemon.map(pm =>
      genOptions(pm.dex, `${pm.name}, ${pm.id}`.toUpperCase())).join('')
);
