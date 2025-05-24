const tianganMap: Record<string, number> = {
  "甲": 1,
  "乙": 2,
  "丙": 3,
  "丁": 4,
  "戊": 5,
  "己": 6,
  "庚": 7,
  "辛": 8,
  "壬": 9,
  "癸": 10,
};

export const tianganArray = [
  "甲",
  "乙",
  "丙",
  "丁",
  "戊",
  "己",
  "庚",
  "辛",
  "壬",
  "癸",
];

export const tiangan2num = (stem: string): number => {
  const num = tianganMap[stem];
  if (num === undefined) {
    throw new Error(`Invalid tiangan: ${stem}`);
  }
  return num;
};

export const num2tiangan = (num: number): string => {
  const stem = Object.keys(tianganMap).find((key) => tianganMap[key] === num);
  if (!stem) {
    throw new Error(`Invalid number for tiangan: ${num}`);
  }
  return stem;
};
