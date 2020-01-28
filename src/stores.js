import { writable, readable, derived } from 'svelte/store';
import { getDexFromUrl, toJSON, genOptions, saveItem, getItem } from './u.js';
import { typesEff } from './types-eff.js';

export const defaultDex = '371';
export const dex = writable(getDexFromUrl() || defaultDex);
export const queryHistory = writable(getDexFromUrl(true));

dex.subscribe(_dex => {
  queryHistory.update(arr => {
    return [...new Set([_dex, ...arr])].slice(-10);
  });
  history.pushState(null, null, `?dex=${_dex}`);
});

window.addEventListener('popstate', (e) => {
  let dexOnUrl = getDexFromUrl();
  dex.set(dexOnUrl);
});



//
//
//
//
//



export const pokemon = writable([]);
export const moves = writable([]);

export const gmUrl = 'gm.json' || 'https://cors-anywhere.herokuapp.com/https://pvpoketw.com/data/gamemaster.json?v=206';

function handlePm(pms) {
  // for checking
  let dexMap = pms.map(p => p.dex);
  dexMap.forEach((dex, idx) => {
    let indexOfFirstDex = dexMap.indexOf(dex);
    let form = '';
    if (idx !== indexOfFirstDex) {
      if (pms[idx].id === pms[indexOfFirstDex].id) {
        // TODO: PvPoke might fix that
        // remove dup data
        pms[idx] = null;
        return;
      }
      form = pms[idx].id.replace(/^.+_/, '_');
    }
    pms[idx].uid = `${dex}${form}`;
  });
  return pms.filter(Boolean);
}


fetch(gmUrl)
.then(toJSON)
.then(d => {
  console.log('gm done:', d);
  pokemon.set(handlePm(d.pokemon));
  moves.set(d.moves);
});

export const datalist = derived(
  pokemon,
  $pokemon =>
    $pokemon.map(pm =>
      genOptions(pm.uid, `${pm.name}, ${pm.id.slice(0, 1).toUpperCase()}${pm.id.slice(1)}`)).join('')
);



//
//
//
//
//



const isOsDarktheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
const localSettings = getItem('settings') || {};
const defaultSettings = {
  head: false,
  types: false,
  fmove: true,
  cmove: true,
  pairs: true,
  history: true,
};
const _settings = {
  details: localSettings.details || defaultSettings,
  gridview: localSettings.gridview,
  darktheme: localSettings.darktheme === undefined
    ? isOsDarktheme
    : localSettings.darktheme,
};

export const settings = writable(_settings);
settings.subscribe(value => {
  saveItem({
    key: 'settings',
    value,
  });
});



//
//
//
//
//



export const eff = readable(typesEff);
export const typeTarget = writable(null);
