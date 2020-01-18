import { writable, derived } from 'svelte/store';
import { toJSON, genOptions } from './u.js';

let qDex = new URLSearchParams(location.search).get('pm');

export const defaultDex = 371;
export const dex = writable(qDex || defaultDex);
// export const pmName = writable([]);
// export const moveName = writable({});

export const pokemon = writable([]);
export const moves = writable([]);
export const listview = writable(true);



const gmUrl = 'gm.json' || 'https://cors-anywhere.herokuapp.com/https://pvpoketw.com/data/gamemaster.json?v=206';

fetch(gmUrl)
.then(toJSON)
.then(d => {
  console.log('gm done:', d);
  pokemon.set(d.pokemon);
  moves.set(d.moves);
})

// fetch('https://raw.githubusercontent.com/Rplus/PokemonGo-data/master/pm-name.json')
// .then(toJSON)
// .then(d => {
//   console.log('name done');
//   let names = Object.keys(d).reduce((all, i) => {
//     all[+i] = d[i];
//     return all;
//   }, []);
//   pmName.set(names);
// })

export const datalist = derived(
  pokemon,
  $pokemon =>
    $pokemon.map(pm =>
      genOptions(pm.dex, pm.name)).join('')
);


// fetch('move-name.json')
// .then(toJSON)
// .then(d => {
//   console.info('move name done.');
//   moveName.set(d);
// });

