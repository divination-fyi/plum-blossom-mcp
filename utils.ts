const baguaMap: Record<string, number> = {
  "乾": 1,
  "兑": 2,
  "离": 3,
  "震": 4,
  "巽": 5,
  "坎": 6,
  "艮": 7,
  "坤": 8,
};

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

const tianganArray = [
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

const dizhiArray = [
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

const fullHexagramMap: Record<string, { upper: string; lower: string }> = {
  "乾为天": { upper: "乾", lower: "乾" },
  "坤为地": { upper: "坤", lower: "坤" },
  "水雷屯": { upper: "坎", lower: "震" },
  "山水蒙": { upper: "艮", lower: "坎" },
  "水天需": { upper: "坎", lower: "乾" },
  "天水讼": { upper: "乾", lower: "坎" },
  "地水师": { upper: "坤", lower: "坎" },
  "水地比": { upper: "坎", lower: "坤" },
  "风天小畜": { upper: "巽", lower: "乾" },
  "天泽履": { upper: "乾", lower: "兑" },
  "地天泰": { upper: "坤", lower: "乾" },
  "天地否": { upper: "乾", lower: "坤" },
  "天火同人": { upper: "乾", lower: "离" },
  "火天大有": { upper: "离", lower: "乾" },
  "地山谦": { upper: "坤", lower: "艮" },
  "雷地豫": { upper: "震", lower: "坤" },
  "泽雷随": { upper: "兑", lower: "震" },
  "山风蛊": { upper: "艮", lower: "巽" },
  "地泽临": { upper: "坤", lower: "兑" },
  "风地观": { upper: "巽", lower: "坤" },
  "火雷噬嗑": { upper: "离", lower: "震" },
  "山火贲": { upper: "艮", lower: "离" },
  "山地剥": { upper: "艮", lower: "坤" },
  "地雷复": { upper: "坤", lower: "震" },
  "天雷无妄": { upper: "乾", lower: "震" },
  "山天大畜": { upper: "艮", lower: "乾" },
  "山雷颐": { upper: "艮", lower: "震" },
  "泽风大过": { upper: "兑", lower: "巽" },
  "坎为水": { upper: "坎", lower: "坎" },
  "离为火": { upper: "离", lower: "离" },
  "泽山咸": { upper: "兑", lower: "艮" },
  "雷风恒": { upper: "震", lower: "巽" },
  "天山遁": { upper: "乾", lower: "艮" },
  "雷天大壮": { upper: "震", lower: "乾" },
  "火地晋": { upper: "离", lower: "坤" },
  "地火明夷": { upper: "坤", lower: "离" },
  "风火家人": { upper: "巽", lower: "离" },
  "火泽睽": { upper: "离", lower: "兑" },
  "水山蹇": { upper: "坎", lower: "艮" },
  "雷水解": { upper: "震", lower: "坎" },
  "山泽损": { upper: "艮", lower: "兑" },
  "风雷益": { upper: "巽", lower: "震" },
  "泽天夬": { upper: "兑", lower: "乾" },
  "天风姤": { upper: "乾", lower: "巽" },
  "泽地萃": { upper: "兑", lower: "坤" },
  "地风升": { upper: "坤", lower: "巽" },
  "泽水困": { upper: "兑", lower: "坎" },
  "水风井": { upper: "坎", lower: "巽" },
  "泽火革": { upper: "兑", lower: "离" },
  "火风鼎": { upper: "离", lower: "巽" },
  "震为雷": { upper: "震", lower: "震" },
  "艮为山": { upper: "艮", lower: "艮" },
  "风山渐": { upper: "巽", lower: "艮" },
  "雷泽归妹": { upper: "震", lower: "兑" },
  "雷火丰": { upper: "震", lower: "离" },
  "火山旅": { upper: "离", lower: "艮" },
  "巽为风": { upper: "巽", lower: "巽" },
  "兑为泽": { upper: "兑", lower: "兑" },
  "风水涣": { upper: "巽", lower: "坎" },
  "水泽节": { upper: "坎", lower: "兑" },
  "风泽中孚": { upper: "巽", lower: "兑" },
  "雷山小过": { upper: "震", lower: "艮" },
  "火水既济": { upper: "离", lower: "坎" },
  "水火未济": { upper: "坎", lower: "离" },
};

export const bagua2num = (bagua: string): number => {
  const num = baguaMap[bagua];
  if (num === undefined) {
    throw new Error(`Invalid bagua: ${bagua}`);
  }
  return num;
};

export const num2bagua = (num: number): string => {
  const bagua = Object.keys(baguaMap).find((key) => baguaMap[key] === num);
  if (!bagua) {
    throw new Error(`Invalid number: ${num}`);
  }
  return bagua;
};

export const tiangan2num = (stem: string): number => {
  const num = tianganMap[stem];
  if (num === undefined) {
    throw new Error(`Invalid heavenly stem: ${stem}`);
  }
  return num;
};

export const num2tiangan = (num: number): string => {
  const stem = Object.keys(tianganMap).find((key) => tianganMap[key] === num);
  if (!stem) {
    throw new Error(`Invalid number for heavenly stem: ${num}`);
  }
  return stem;
};

export const dizhi2num = (branch: string): number => {
  const num = dizhiMap[branch];
  if (num === undefined) {
    throw new Error(`Invalid earthly branch: ${branch}`);
  }
  return num;
};

export const num2dizhi = (num: number): string => {
  const branch = Object.keys(dizhiMap).find((key) => dizhiMap[key] === num);
  if (!branch) {
    throw new Error(`Invalid number for earthly branch: ${num}`);
  }
  return branch;
};

export const fullGua2trigrams = (
  fullGua: string,
): { upper: string; lower: string } => {
  const trigrams = fullHexagramMap[fullGua];
  if (!trigrams) {
    throw new Error(`Invalid full hexagram: ${fullGua}`);
  }
  return trigrams;
};

export const trigrams2fullGua = (
  upperGua: string,
  lowerGua: string,
): string => {
  const fullGua = Object.keys(fullHexagramMap).find((key) =>
    fullHexagramMap[key].upper === upperGua &&
    fullHexagramMap[key].lower === lowerGua
  );
  if (!fullGua) {
    throw new Error(
      `Invalid trigram combination: upper=${upperGua}, lower=${lowerGua}`,
    );
  }
  return fullGua;
};

const baguaBinaryMap: Record<string, string> = {
  "乾": "111",
  "兑": "110",
  "离": "101",
  "震": "100",
  "巽": "011",
  "坎": "010",
  "艮": "001",
  "坤": "000",
};

export const bagua2binary = (bagua: string): string => {
  const binary = baguaBinaryMap[bagua];
  if (binary === undefined) {
    throw new Error(`Invalid bagua: ${bagua}`);
  }
  return binary;
};

export const binary3ToBagua = (binary: string): string => {
  const bagua = Object.keys(baguaBinaryMap).find((key) =>
    baguaBinaryMap[key] === binary
  );
  if (!bagua) {
    throw new Error(`Invalid 3-bit binary string: ${binary}`);
  }
  return bagua;
};

export const binary6ToTrigrams = (
  binary: string,
): { upper: string; lower: string } => {
  if (binary.length !== 6) {
    throw new Error(`Invalid 6-bit binary string: ${binary}`);
  }
  const upperBinary = binary.substring(0, 3);
  const lowerBinary = binary.substring(3);
  const upperGua = binary3ToBagua(upperBinary);
  const lowerGua = binary3ToBagua(lowerBinary);
  return { upper: upperGua, lower: lowerGua };
};

export const flipBinaryBit = (binary: string, line: number): string => {
  if (binary.length !== 6) {
    throw new Error(`Invalid 6-bit binary string: ${binary}`);
  }
  if (line < 1 || line > 6) {
    throw new Error(`Invalid line number: ${line}`);
  }
  const index = line - 1; // 0-based index
  const bit = binary[index];
  const flippedBit = bit === "0" ? "1" : "0";
  return binary.substring(0, index) + flippedBit + binary.substring(index + 1);
};

export const getInnerHexagramBinary = (
  binary: string,
): { upper: string; lower: string } => {
  if (binary.length !== 6) {
    throw new Error(`Invalid 6-bit binary string: ${binary}`);
  }
  const lowerInnerBinary = binary.substring(1, 4); // Lines 2, 3, 4
  const upperInnerBinary = binary.substring(2, 5); // Lines 3, 4, 5
  return { upper: upperInnerBinary, lower: lowerInnerBinary };
};

export const gregorianYearToNongli = (year: number) => {
  // The cycle starts from year 4 (甲子)
  // Heavenly Stem: (year - 4) % 10 + 1, then map to tianganArray
  // Earthly Branch: (year - 4) % 12 + 1, then map to dizhiArray

  // For simplicity and common usage, we can use (year - 3) for the calculation
  // as year 3 is 癸亥, year 4 is 甲子.
  // (year - 3) % 10 for Heavenly Stem index (0-9)
  // (year - 3) % 12 for Earthly Branch index (0-11)

  const tianganIndex = (year - 4) % 10;
  const dizhiIndex = (year - 4) % 12;

  const tiangan = tianganArray[tianganIndex];
  const dizhi = dizhiArray[dizhiIndex];
  const zodiac = zodiacMap[dizhi];

  return { tiangan, dizhi, zodiac };
};

export const timeToDizhi = (hour: number, minute: number): string => {
  // Convert time to a single minute value from 00:00
  const totalMinutes = hour * 60 + minute;

  // Define the start and end minutes for each Shichen (子时 starts at 23:00 of previous day)
  // To handle 子时 spanning across midnight, we can adjust the hour for calculation.
  // Treat 23:00 - 23:59 as part of the current day's 子时, and 00:00 - 00:59 as part of the next day's 子时.
  // For simplicity, let's map 00:00-00:59 to 子时, 01:00-02:59 to 丑时, etc.
  // And 23:00-23:59 to 子时.

  // Adjust hour for 子时 (23:00-00:59)
  let adjustedHour = hour;
  if (hour === 0) { // 00:00 - 00:59 is 子时
    adjustedHour = 24; // Treat 00:xx as 24:xx for calculation purposes to align with 23:xx
  } else if (hour === 23) { // 23:00 - 23:59 is 子时
    adjustedHour = 23;
  } else {
    adjustedHour = hour;
  }

  // Calculate the index based on adjusted hour
  // Each Shichen is 2 hours.
  // 子时: 23-00 (index 0)
  // 丑时: 01-02 (index 1)
  // 寅时: 03-04 (index 2)
  // 卯时: 05-06 (index 3)
  // 辰时: 07-08 (index 4)
  // 巳时: 09-10 (index 5)
  // 午时: 11-12 (index 6)
  // 未时: 13-14 (index 7)
  // 申时: 15-16 (index 8)
  // 酉时: 17-18 (index 9)
  // 戌时: 19-20 (index 10)
  // 亥时: 21-22 (index 11)

  // The dizhiArray is 0-indexed: 子, 丑, 寅, 卯, 辰, 巳, 午, 未, 申, 酉, 戌, 亥
  // So, we need to map the hour to the correct index.
  // (adjustedHour + 1) % 24 / 2
  // 23 -> (23+1)%24 = 0 -> 0/2 = 0 (子)
  // 00 -> (00+1)%24 = 1 -> 1/2 = 0 (子) - This is problematic.

  // Let's use a direct mapping based on the hour ranges.
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
