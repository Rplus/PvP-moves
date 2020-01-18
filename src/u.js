export function ddex(dex) {
  return `00${dex}`.slice(-3);
}

export function genOptions(v, l = v) {
  return `<option value="${v}" label="${l}"></option>`;
};


const STORAGE_KEY = 'PvP-Moves';
export function saveItem(data) {
  if (!data || !data.key) { return false;}
  let odata = getItem() || {};

  odata[data.key] = data.value;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(odata));
};



export function getItem(key) {
  let data = localStorage.getItem(STORAGE_KEY);
  if (!data) { return null; }
  data = JSON.parse(data);

  return key ? data[key] : data;
};



const CORS_URL = 'https://cors-anywhere.herokuapp.com/';
function moveUrl(pm) {
  pm = {... { dex: 1, form: '' }, ...pm};
  return `./${pm.dex}-m.json`;
  // return `${CORS_URL}https://db.pokemongohub.net/api/moves/with-pokemon/${pm.dex}?form=${pm.form}`;
}

function pmUrl(pm) {
  pm = {... { dex: 1, form: '' }, ...pm};
  return `./${pm.dex}.json`;
  // return `${CORS_URL}https://db.pokemongohub.net/api/pokemon/${pm.dex}?form=${pm.form}`;
}

export function getUrl(type = 'move', option) {
  switch (type) {
    case 'move':
      return moveUrl(option);
    case 'pm':
      return pmUrl(option);
    default:
      break;
  }
};


const CPM = {
  '8': 0.37523559,
  '13': 0.48168495,
};

export function calPmCP(base, adsl) {
  let [a, d, s, l] = adsl;
  let mFactor = CPM[l];
  let ADS = (base.atk + a) * Math.pow((base.def + d) * (base.sta + s), 0.5);
  let total = ADS * Math.pow(mFactor, 2.0);

  return Math.max(10, Math.floor(total / 10));
};

export function calPmWOWCP(base, lv) {
  let o = [10, 11, 12, 13, 14, 15];
  let max = calPmCP(base, [10, 10, 10, lv]);
  let ngiv = '10-10-10';

  for (let ia of o) {
    for (let id of o) {
      for (let is of o) {
        let c = calPmCP(base, [ia, id, is, lv]);
        if (c <= max) {
          continue;
        } else if (ia < 12 || id < 12 || is < 12) {
          max = c
          ngiv = `${ia}-${id}-${is}`;
        }
      }
    }
  }

  return max + 1;
};
