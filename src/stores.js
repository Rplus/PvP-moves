import { writable, derived } from 'svelte/store';
import { getDexFromUrl, toJSON, genOptions, saveItem, getItem } from './u.js';

export const defaultDex = 371;
export const dex = writable(getDexFromUrl() || defaultDex);
export const queryHistory = writable(getDexFromUrl(true));

dex.subscribe(_dex => {
  queryHistory.update(arr => {
    return [...new Set([...arr, _dex].reverse())].reverse().slice(-10);
  });
  history.pushState({dex: _dex}, null, `?dex=${_dex}`);
});

window.addEventListener('popstate', (e) => {
  let dexOnUrl = getDexFromUrl();
  dex.set(dexOnUrl);
});

export const pokemon = writable([]);
export const moves = writable([]);

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



//
//
//
//
//


const isOsDarktheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
const localSettings = getItem('settings') || {};
const _settings = {
  gridview: localSettings.gridview,
  darktheme: localSettings.darktheme === undefined
    ? isOsDarktheme
    : localSettings.darktheme,
};

export const settings = writable(_settings);
settings.subscribe(value => {
  console.log(value);
  saveItem({
    key: 'settings',
    value,
  });
});
