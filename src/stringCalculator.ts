export const add = (numbers: string): number => {
  if (!numbers.trim()) return 0;

  let delimiter = /,|\n/;
  let numberString = numbers;

  if (numbers.startsWith("//")) {
    const parts = numbers.split("\n");

    if (parts.length < 2) {
      throw new Error("Invalid format for custom delimiter");
    }

    const delimiterPart = parts[0].substring(2);
    delimiter = new RegExp(
      delimiterPart.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    );
    numberString = parts[1] || "";
  }

  if (!numberString.trim()) return 0;

  const nums = numberString
    .split(delimiter)
    .map((n) => parseInt(n.trim()))
    .filter((n) => !isNaN(n));

  const negatives = nums.filter((n) => n < 0);
  if (negatives.length > 0) {
    throw new Error(`Negative numbers not allowed: ${negatives.join(", ")}`);
  }

  return nums.filter((n) => n <= 1000).reduce((sum, num) => sum + num, 0);
};
