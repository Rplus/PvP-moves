import json from './eff.json';

let effMap = Object.keys(json.effMap).reduce((all, i) => {
  all[json.effMap[i]] = +i;
  return all;
}, {});

let data = json.data
  .split(json.spliter.atk)
  .map(i => i.split(json.spliter.def));

const op = json.types.map(type => ({
  type,
  effs: [[], [], [], []],
}));

for (let ai in data) {
  let at = json.types[ai];
  for (let _i in data[ai]) {
    let eff = effMap[data[ai][_i].slice(0, 1)];
    let di = +data[ai][_i].slice(1);
    let dt = json.types[di];

    op[ai].effs[eff > 0 ? 0 : 1].push({type: dt, factor: eff});
    op[di].effs[eff > 0 ? 2 : 3].push({type: at, factor: eff});
  }
}

export const typesEff = op;
