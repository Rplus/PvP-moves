export function getDexFromUrl(all = false) {
  let dexs = new URLSearchParams(location.search).getAll('dex');
  if (all) {
  }
  return all ? dexs : dexs[0];
}

export function ddex(dex) {
  return `00${dex}`.slice(-3);
}

export function toJSON(res) {
  return res.json();
}

export function genOptions(v, l = v) {
  return `<option value="${v}" label="${l}"></option>`;
};

export function copy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export function fixNum(num, d = 2, toStr) {
  let op = (+num).toFixed(d);
  return toStr ? op : +op;
}

const buffTypes = ['攻', '防'];
const buffTargets = {
  opponent: '敵',
  self: '己',
};

export function introEffect(move) {
  let buffs = move.buffs.map((b, index) => {
    if (!b) { return ''}
    return `${b > 0 ? '+' : ''}${b}階${buffTypes[index]}`;
  }).filter(Boolean).join(', ');
  return `${move.buffApplyChance * 100}%, ${buffs}, [${buffTargets[move.buffTarget]}]`;
}


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



const CPM = {
  '1': 0.094,
  '1.5': 0.135137432,
  '2': 0.16639787,
  '2.5': 0.192650919,
  '3': 0.21573247,
  '3.5': 0.236572661,
  '4': 0.25572005,
  '4.5': 0.273530381,
  '5': 0.29024988,
  '5.5': 0.306057377,
  '6': 0.3210876,
  '6.5': 0.335445036,
  '7': 0.34921268,
  '7.5': 0.362457751,
  '8': 0.37523559,
  '8.5': 0.387592406,
  '9': 0.39956728,
  '9.5': 0.411193551,
  '10': 0.42250001,
  '10.5': 0.432926419,
  '11': 0.44310755,
  '11.5': 0.453059958,
  '12': 0.46279839,
  '12.5': 0.472336083,
  '13': 0.48168495,
  '13.5': 0.4908558,
  '14': 0.49985844,
  '14.5': 0.508701765,
  '15': 0.51739395,
  '15.5': 0.525942511,
  '16': 0.53435433,
  '16.5': 0.542635767,
  '17': 0.55079269,
  '17.5': 0.558830576,
  '18': 0.56675452,
  '18.5': 0.574569153,
  '19': 0.58227891,
  '19.5': 0.589887917,
  '20': 0.59740001,
  '20.5': 0.604818814,
  '21': 0.61215729,
  '21.5': 0.619399365,
  '22': 0.62656713,
  '22.5': 0.633644533,
  '23': 0.64065295,
  '23.5': 0.647576426,
  '24': 0.65443563,
  '24.5': 0.661214806,
  '25': 0.667934,
  '25.5': 0.674577537,
  '26': 0.68116492,
  '26.5': 0.687680648,
  '27': 0.69414365,
  '27.5': 0.700538673,
  '28': 0.70688421,
  '28.5': 0.713164996,
  '29': 0.71939909,
  '29.5': 0.725571552,
  '30': 0.7317,
  '30.5': 0.734741009,
  '31': 0.73776948,
  '31.5': 0.740785574,
  '32': 0.74378943,
  '32.5': 0.746781211,
  '33': 0.74976104,
  '33.5': 0.752729087,
  '34': 0.75568551,
  '34.5': 0.758630378,
  '35': 0.76156384,
  '35.5': 0.764486065,
  '36': 0.76739717,
  '36.5': 0.770297266,
  '37': 0.7731865,
  '37.5': 0.776064962,
  '38': 0.77893275,
  '38.5': 0.781790055,
  '39': 0.78463697,
  '39.5': 0.787473578,
  '40': 0.79030001,
  '40.5': 0.7931164,
  '41': 0.79530001,
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
          max = c;
          ngiv = `${ia}-${id}-${is}`;
        }
      }
    }
  }

  return max + 1;
};
