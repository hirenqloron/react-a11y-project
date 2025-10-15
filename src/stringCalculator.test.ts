export const add = (numbers: string): number => {
  if (!numbers.trim()) return 0;

  let delimiter = /,|\n/;
  let numberString = numbers;

  if (numbers.startsWith('//')) {
    const parts = numbers.split('\n');
    delimiter = new RegExp(parts[0].substring(2));
    numberString = parts[1];
  }

  const nums = numberString.split(delimiter).map(n => parseInt(n.trim()));

  const negatives = nums.filter(n => n < 0);
  if (negatives.length > 0) {
    throw new Error(`Negative numbers not allowed: ${negatives.join(', ')}`);
  }

  return nums.reduce((sum, num) => sum + (isNaN(num) ? 0 : num), 0);
};