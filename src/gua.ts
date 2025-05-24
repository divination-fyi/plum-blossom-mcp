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

const fullGuaMap: Record<string, { upper: string; lower: string }> = {
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

export const fullGua2trigrams = (
  fullGua: string,
): { upper: string; lower: string } => {
  const trigrams = fullGuaMap[fullGua];
  if (!trigrams) {
    throw new Error(`Invalid full gua: ${fullGua}`);
  }
  return trigrams;
};

export const trigrams2fullGua = (
  upperGua: string,
  lowerGua: string,
): string => {
  const fullGua = Object.keys(fullGuaMap).find((key) =>
    fullGuaMap[key].upper === upperGua &&
    fullGuaMap[key].lower === lowerGua
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

export const getInnerGuaBinary = (
  binary: string,
): { upper: string; lower: string } => {
  if (binary.length !== 6) {
    throw new Error(`Invalid 6-bit binary string: ${binary}`);
  }
  const lowerInnerBinary = binary.substring(1, 4); // Lines 2, 3, 4
  const upperInnerBinary = binary.substring(2, 5); // Lines 3, 4, 5
  return { upper: upperInnerBinary, lower: lowerInnerBinary };
};
