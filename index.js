const { randomInt } = require("crypto");

const NUM_OF_SUBSTAT_ROLL_TYPES = 4;

const StatType = {
  ATK_Percent: "ATK%",
  ATK_Flat: "ATK",
  DEF_Percent: "DEF%",
  DEF_Flat: "DEF",
  HP_Percent: "HP%",
  HP_Flat: "HP",
  EM: "Elemental Mastery",
  ER: "Energy Recharge",
  CR: "Crit Rate",
  CD: "CRIT DMG",
  Pyro_DMG_Percent: "Pyro DMG%",
  Cryo_DMG_Percent: "Cryo DMG%",
  Anemo_DMG_Percent: "Anemo DMG%",
  Hydro_DMG_Percent: "Hydro DMG%",
  Geo_DMG_Percent: "Geo DMG%",
  Electro_DMG_Percent: "Electro DMG%",
  Phys_DMG_Percent: "Physical DMG%",
  Heal_Bonus_Percent: "Healing Bonus%",
};

const ArtifactType = {
  Flower: "Flower",
  Feather: "Feather",
  Timepiece: "Timepiece",
  Goblet: "Goblet",
  Circlet: "Circlet",
};

const data_randomizer_factory = function (data) {
  return alias_sampler(data.map((d) => d[1]));
};

const hp_flat_substat_roll = [209, 239, 269, 299];
const def_flat_substat_roll = [16, 19, 21, 23];
const atk_flat_substat_roll = [14, 16, 18, 19];
const hp_percent_substat_roll = [4.1, 4.7, 5.3, 5.8];
const def_percent_substat_roll = [5.1, 5.8, 6.6, 7.3];
const atk_percent_substat_roll = [4.1, 4.7, 5.3, 5.8];
const em_substat_roll = [16, 19, 21, 23];
const er_substat_roll = [4.5, 5.2, 5.8, 6.5];
const cr_substat_roll = [2.7, 3.1, 3.5, 3.9];
const cd_substat_roll = [5.4, 6.2, 7, 7.8];

const five_star_drop_data = [
  [1, 0.932],
  [2, 0.068],
];

const four_star_drop_data = [
  [1, 0.514],
  [2, 0.486],
];

const three_star_drop_data = [
  [3, 0.453],
  [4, 0.547],
];

const five_star_drop_randomizer = data_randomizer_factory(five_star_drop_data);
const four_star_drop_randomizer = data_randomizer_factory(four_star_drop_data);
const three_star_drop_randomizer = data_randomizer_factory(
  three_star_drop_data
);

const five_star_num_substat_lines_drop_rate = [0.77, 0.23];
const five_star_num_substat_lines = [3, 4];

const adjust_data = function (data, stat_to_be_removed) {
  return data.filter((d) => d[0] !== stat_to_be_removed);
};

const flower_substat_data = [
  [StatType.ATK_Flat, 0.14],
  [StatType.ATK_Percent, 0.11],
  [StatType.DEF_Flat, 0.14],
  [StatType.DEF_Percent, 0.22],
  [StatType.HP_Percent, 0.11],
  [StatType.EM, 0.11],
  [StatType.ER, 0.09],
  [StatType.CR, 0.09],
  [StatType.CD, 0.09],
];

const flower_substat_randomizer = data_randomizer_factory(flower_substat_data);

const feather_substat_data = [
  [StatType.ATK_Percent, 0.11],
  [StatType.DEF_Flat, 0.16],
  [StatType.DEF_Percent, 0.11],
  [StatType.HP_Flat, 0.14],
  [StatType.HP_Percent, 0.14],
  [StatType.EM, 0.11],
  [StatType.ER, 0.1],
  [StatType.CR, 0.09],
  [StatType.CD, 0.07],
];

const feather_substat_randomizer = data_randomizer_factory(
  feather_substat_data
);

const timepiece_mainstat_data = [
  [StatType.ATK_Percent, 0.25],
  [StatType.DEF_Percent, 0.28],
  [StatType.HP_Percent, 0.28],
  [StatType.EM, 0.1],
  [StatType.ER, 0.09],
];

const timepiece_mainstat_randomizer = data_randomizer_factory(
  timepiece_mainstat_data
);

const timepiece_substat_data = [
  [StatType.ATK_Flat, 0.15],
  [StatType.ATK_Percent, 0.11],
  [StatType.DEF_Flat, 0.16],
  [StatType.DEF_Percent, 0.09],
  [StatType.HP_Flat, 0.15],
  [StatType.HP_Percent, 0.12],
  [StatType.EM, 0.09],
  [StatType.ER, 0.08],
  [StatType.CR, 0.08],
  [StatType.CD, 0.07],
];

let timepiece_substat_randomizers = {};
timepiece_mainstat_data
  .map((d) => d[0])
  .forEach((stat) => {
    timepiece_substat_randomizers[stat] = data_randomizer_factory(
      adjust_data(timepiece_substat_data, stat)
    );
  });

const goblet_mainstat_data = [
  [StatType.Pyro_DMG_Percent, 0.0471],
  [StatType.Cryo_DMG_Percent, 0.0471],
  [StatType.Anemo_DMG_Percent, 0.0471],
  [StatType.Geo_DMG_Percent, 0.0471],
  [StatType.Hydro_DMG_Percent, 0.0471],
  [StatType.Electro_DMG_Percent, 0.0471],
  [StatType.Phys_DMG_Percent, 0.0403],
  [StatType.ATK_Percent, 0.21],
  [StatType.DEF_Percent, 0.21],
  [StatType.HP_Percent, 0.19],
  [StatType.EM, 0.02],
];

const goblet_mainstat_randomizer = data_randomizer_factory(
  goblet_mainstat_data
);

const goblet_substat_data = [
  [StatType.ATK_Flat, 0.14],
  [StatType.ATK_Percent, 0.1],
  [StatType.DEF_Flat, 0.14],
  [StatType.DEF_Percent, 0.11],
  [StatType.HP_Flat, 0.13],
  [StatType.HP_Percent, 0.1],
  [StatType.EM, 0.09],
  [StatType.ER, 0.09],
  [StatType.CR, 0.08],
  [StatType.CD, 0.08],
];

let goblet_substat_randomizers = {};
goblet_mainstat_data
  .map((d) => d[0])
  .forEach((stat) => {
    goblet_substat_randomizers[stat] = data_randomizer_factory(
      adjust_data(goblet_substat_data, stat)
    );
  });

const circlet_mainstat_data = [
  [StatType.ATK_Percent, 0.22],
  [StatType.DEF_Percent, 0.24],
  [StatType.HP_Percent, 0.22],
  [StatType.EM, 0.05],
  [StatType.CR, 0.1],
  [StatType.CD, 0.1],
  [StatType.Heal_Bonus_Percent, 0.07],
];

const circlet_mainstat_randomizer = data_randomizer_factory(
  circlet_mainstat_data
);

const circlet_substat_data = [
  [StatType.ATK_Flat, 0.16],
  [StatType.ATK_Percent, 0.1],
  [StatType.DEF_Flat, 0.15],
  [StatType.DEF_Percent, 0.09],
  [StatType.HP_Flat, 0.14],
  [StatType.HP_Percent, 0.11],
  [StatType.EM, 0.08],
  [StatType.ER, 0.1],
  [StatType.CR, 0.08],
  [StatType.CD, 0.07],
];

let circlet_substat_randomizers = {};
circlet_mainstat_data
  .map((d) => d[0])
  .forEach((stat) => {
    circlet_substat_randomizers[stat] = data_randomizer_factory(
      adjust_data(circlet_substat_data, stat)
    );
  });

const artifact_type_drop_rate = [0.2, 0.2, 0.2, 0.2, 0.2];
const artifact_type_drop = [
  ArtifactType.Flower,
  ArtifactType.Feather,
  ArtifactType.Timepiece,
  ArtifactType.Goblet,
  ArtifactType.Circlet,
];

const substat_num_randomizer = alias_sampler(
  five_star_num_substat_lines_drop_rate
);

const artifact_type_drop_randomizer = alias_sampler(artifact_type_drop_rate);

let generate_5_star_artifact = function () {
  const num_substats = five_star_num_substat_lines[substat_num_randomizer()];
  const artifact_type = artifact_type_drop[artifact_type_drop_randomizer()];
  const main_stat = generate_mainstat(artifact_type);
  const substats = generate_substats(artifact_type, main_stat, num_substats);

  let arti = {
    artifact_type: artifact_type,
    level: 0,
    main_stat: main_stat,
    substats: substats,
  };

  return arti;
};

let generate_substats = function (artifact_type, mainstat, num_substats) {
  let substats = new Map();
  for (i = 0; i < num_substats; i++) {
    let stat = generate_substat(artifact_type, mainstat);
    while (substats.has(stat)) {
      stat = generate_substat(artifact_type, mainstat);
    }
    let stat_value = generate_stat_roll(stat);
    substats.set(stat, stat_value);
  }
  return substats;
};

let generate_stat_roll = function (stat) {
  let idx = randomInt(NUM_OF_SUBSTAT_ROLL_TYPES);
  let output;
  switch (stat) {
    case StatType.ATK_Flat:
      output = atk_flat_substat_roll[idx];
      break;
    case StatType.DEF_Flat:
      output = def_flat_substat_roll[idx];
      break;
    case StatType.HP_Flat:
      output = hp_flat_substat_roll[idx];
      break;
    case StatType.ATK_Percent:
      output = atk_percent_substat_roll[idx];
      break;
    case StatType.HP_Percent:
      output = hp_percent_substat_roll[idx];
      break;
    case StatType.DEF_Percent:
      output = def_percent_substat_roll[idx];
      break;
    case StatType.EM:
      output = em_substat_roll[idx];
      break;
    case StatType.ER:
      output = er_substat_roll[idx];
      break;
    case StatType.CR:
      output = cr_substat_roll[idx];
      break;
    case StatType.CD:
      output = cd_substat_roll[idx];
      break;
    default:
      output = -1;
      break;
  }
  return output;
};

let generate_substat = function (artifact_type, mainstat) {
  let sub_stat;
  switch (artifact_type) {
    case ArtifactType.Flower:
      sub_stat = flower_substat_data[flower_substat_randomizer()][0];
      break;
    case ArtifactType.Feather:
      sub_stat = feather_substat_data[feather_substat_randomizer()][0];
      break;
    case ArtifactType.Timepiece:
      sub_stat =
        timepiece_substat_data[timepiece_substat_randomizers[mainstat]()][0];
      break;
    case ArtifactType.Goblet:
      sub_stat = goblet_substat_data[goblet_substat_randomizers[mainstat]()][0];
      break;
    case ArtifactType.Circlet:
      sub_stat =
        circlet_substat_data[circlet_substat_randomizers[mainstat]()][0];
      break;
    default:
      sub_stat = StatType.HP_Flat;
  }
  return sub_stat;
};

let generate_mainstat = function (artifact_type) {
  let main_stat;
  switch (artifact_type) {
    case ArtifactType.Flower:
      main_stat = StatType.HP_Flat;
      break;
    case ArtifactType.Feather:
      main_stat = StatType.ATK_Flat;
      break;
    case ArtifactType.Timepiece:
      main_stat = timepiece_mainstat_data[timepiece_mainstat_randomizer()][0];
      break;
    case ArtifactType.Goblet:
      main_stat = goblet_mainstat_data[goblet_mainstat_randomizer()][0];
      break;
    case ArtifactType.Circlet:
      main_stat = circlet_mainstat_data[circlet_mainstat_randomizer()][0];
      break;
    default:
      main_stat = StatType.HP_Flat;
  }
  return main_stat;
};

function roundToTwo(num) {
  return +(Math.round(num + "e+2") + "e-2");
}

let plus4_artifact = function (artifact) {
  artifact.level = artifact.level + 4;
  let num_of_substats = artifact.substats.size;
  if (num_of_substats === 3) {
    let newStat = generate_substat(artifact.artifact_type, artifact.main_stat);
    while (artifact.substats.has(newStat)) {
      newStat = generate_substat(artifact.artifact_type, artifact.main_stat);
    }

    let stat_value = generate_stat_roll(newStat);
    artifact.substats.set(newStat, stat_value);
  } else {
    let idx = randomInt(4);
    let substat = Array.from(artifact.substats.keys())[idx];
    artifact.substats.set(
      substat,
      roundToTwo(
        artifact.substats.get(substat) + generate_stat_roll(substat),
        2
      )
    );
  }
};

let use_20_resin_for_artifact = function () {
  console.log("Used 20 resin");
  let num_of_five_stars = five_star_drop_data[five_star_drop_randomizer()][0];
  let num_of_four_stars = four_star_drop_data[four_star_drop_randomizer()][0];
  let num_of_three_stars =
    three_star_drop_data[three_star_drop_randomizer()][0];

  let five_stars = [];
  for (i = 0; i < num_of_five_stars; i++) {
    five_stars.push(generate_5_star_artifact());
  }

  console.log("You gained " + num_of_five_stars + " 5* artifacts");
  console.log(five_stars);
  console.log("You gained " + num_of_four_stars + " 4* artifacts");
  console.log("You gained " + num_of_three_stars + " 3* artifacts");
  return five_stars;
};

let [arti] = use_20_resin_for_artifact();
plus4_artifact(arti);
console.log(arti);
plus4_artifact(arti);
console.log(arti);
plus4_artifact(arti);
console.log(arti);
plus4_artifact(arti);
console.log(arti);
plus4_artifact(arti);
console.log(arti);

function alias_sampler(inputProbabilities) {
  var probabilities, aliases;

  probabilities = inputProbabilities.map(function (p, i) {
    if (Number.isNaN(Number(p))) {
      throw new TypeError("Non-numerical value in distribution at index " + i);
    }
    return Number(p);
  });
  var probsum = inputProbabilities.reduce(function (sum, p) {
    return sum + p;
  }, 0);

  var probMultiplier = inputProbabilities.length / probsum;
  probabilities = probabilities.map(function (p, i) {
    return p * probMultiplier;
  });

  var overFull = [],
    underFull = [];
  probabilities.forEach(function (p, i) {
    if (p > 1) overFull.push(i);
    else if (p < 1) underFull.push(i);
    else if (p !== 1) {
      throw new Error(
        "User program has disrupted JavaScript defaults " +
          "and prevented this function from executing correctly."
      );
    }
  });

  aliases = [];
  while (overFull.length > 0 || underFull.length > 0) {
    if (overFull.length > 0 && underFull.length > 0) {
      aliases[underFull[0]] = overFull[0];
      probabilities[overFull[0]] += probabilities[underFull[0]] - 1;
      underFull.shift();
      if (probabilities[overFull[0]] > 1) overFull.push(overFull.shift());
      else if (probabilities[overFull[0]] < 1) underFull.push(overFull.shift());
      else overFull.shift();
    } else {
      var notEmptyArray = overFull.length > 0 ? overFull : underFull;
      notEmptyArray.forEach(function (index) {
        probabilities[index] = 1;
      });
      notEmptyArray.length = 0;
    }
  }

  return function sample() {
    var index = Math.floor(Math.random() * probabilities.length);
    return Math.random() < probabilities[index] ? index : aliases[index];
  };
}
