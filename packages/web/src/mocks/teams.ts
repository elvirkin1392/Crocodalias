const teams = [
  "Sea Wolves",
  "Risky Biscuits",
  "Avalanche",
  "Cool Runnings",
  "Agatha Crispy",
];

export const getRandomTeams = function (amount: number): string[] {
  if (amount === 0) {
    return [];
  }
  const range = Math.floor(teams.length / amount);
  const result: string[] = [];

  for (let i = 0; i <= amount - 1; i++) {
    result.push(teams[i * range + Math.floor(Math.random() * range)]);
  }
  return result;
};
