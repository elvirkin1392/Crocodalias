/** Picks `amount` playful team names out of `pool`, spread across it. */
export const getRandomTeams = function (
  amount: number,
  pool: string[],
): string[] {
  if (amount === 0) {
    return [];
  }
  const range = Math.floor(pool.length / amount);
  const result: string[] = [];

  for (let i = 0; i <= amount - 1; i++) {
    result.push(pool[i * range + Math.floor(Math.random() * range)]);
  }
  return result;
};
