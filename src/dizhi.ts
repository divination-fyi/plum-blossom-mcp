import { tianganArray } from "./tiangan.ts";
const dizhiMap: Record<string, number> = {
  "子": 1,
  "丑": 2,
  "寅": 3,
  "卯": 4,
  "辰": 5,
  "巳": 6,
  "午": 7,
  "未": 8,
  "申": 9,
  "酉": 10,
  "戌": 11,
  "亥": 12,
};

export const dizhiArray = [
  "子",
  "丑",
  "寅",
  "卯",
  "辰",
  "巳",
  "午",
  "未",
  "申",
  "酉",
  "戌",
  "亥",
];

const zodiacMap: Record<string, string> = {
  "子": "鼠",
  "丑": "牛",
  "寅": "虎",
  "卯": "兔",
  "辰": "龙",
  "巳": "蛇",
  "午": "马",
  "未": "羊",
  "申": "猴",
  "酉": "鸡",
  "戌": "狗",
  "亥": "猪",
};

export const dizhi2num = (branch: string): number => {
  const num = dizhiMap[branch];
  if (num === undefined) {
    throw new Error(`Invalid dizhi: ${branch}`);
  }
  return num;
};

export const num2dizhi = (num: number): string => {
  const branch = Object.keys(dizhiMap).find((key) => dizhiMap[key] === num);
  if (!branch) {
    throw new Error(`Invalid number for dizhi: ${num}`);
  }
  return branch;
};

export const gregorianYearToNongli = (year: number) => {
  const tianganIndex = (year - 4) % 10;
  const dizhiIndex = (year - 4) % 12;

  const tiangan = tianganArray[tianganIndex];
  const dizhi = dizhiArray[dizhiIndex];
  const zodiac = zodiacMap[dizhi];

  return { tiangan, dizhi, zodiac };
};

export const timeToDizhi = (hour: number, minute: number): string => {
  const shichenRanges = [
    { start: 23, end: 0, dizhi: "子" }, // 23:00 - 00:59
    { start: 1, end: 2, dizhi: "丑" },
    { start: 3, end: 4, dizhi: "寅" },
    { start: 5, end: 6, dizhi: "卯" },
    { start: 7, end: 8, dizhi: "辰" },
    { start: 9, end: 10, dizhi: "巳" },
    { start: 11, end: 12, dizhi: "午" },
    { start: 13, end: 14, dizhi: "未" },
    { start: 15, end: 16, dizhi: "申" },
    { start: 17, end: 18, dizhi: "酉" },
    { start: 19, end: 20, dizhi: "戌" },
    { start: 21, end: 22, dizhi: "亥" },
  ];

  for (const range of shichenRanges) {
    if (range.start <= range.end) { // Normal range (e.g., 01:00-02:59)
      if (hour >= range.start && hour <= range.end) {
        return range.dizhi;
      }
    } else { // Range crosses midnight (子时: 23:00-00:59)
      if (hour >= range.start || hour <= range.end) {
        return range.dizhi;
      }
    }
  }

  throw new Error(`Invalid time: ${hour}:${minute}`);
};
