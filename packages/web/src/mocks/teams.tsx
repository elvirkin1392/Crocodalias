const teams = [
  "Sea Wolves",
  "Risky Biscuits",
  "Avalanche",
  "Cool Runnings",
  "Agatha Crispy",
];

export const getRandomTeams = function (amount) {
  if (amount === 0) {
    return [];
  }
  let range = Math.floor(teams.length / amount);
  let result = [];

  for (let i = 0; i <= amount - 1; i++) {
    result.push(teams[i * range + Math.floor(Math.random() * range)]);
  }
  return result;
};
