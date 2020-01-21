export function getDexFromUrl(all = false) {
  let dexs = new URLSearchParams(location.search).getAll('dex').map(Number);
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
          max = c;
          ngiv = `${ia}-${id}-${is}`;
        }
      }
    }
  }

  return max + 1;
};
