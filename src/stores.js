import { writable, derived } from 'svelte/store';
import { genOptions } from './u.js';

let qDex = new URLSearchParams(location.search).get('pm');

export const defaultDex = 371;
export const dex = writable(qDex || defaultDex);
export const pmName = writable([]);
export const moveName = writable({});


fetch('https://cors-anywhere.herokuapp.com/https://pvpoketw.com/data/gamemaster.json?v=206')

fetch('https://raw.githubusercontent.com/Rplus/PokemonGo-data/master/pm-name.json')
.then(d => d.json())
.then(d => {
  console.log('name done');
  let names = Object.keys(d).reduce((all, i) => {
    all[+i] = d[i];
    return all;
  }, []);
  pmName.set(names);
})

export const datalist = derived(
  pmName,
  $pmName =>
    $pmName.map((n, dex) =>
      genOptions(dex, n.zh)).join('')
);


fetch('move-name.json')
.then(d => d.json())
.then(d => {
  console.info('move name done.');
  moveName.set(d);
});

