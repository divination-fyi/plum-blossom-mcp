import {
  bagua2binary,
  binary3ToBagua,
  binary6ToTrigrams,
  dizhi2num,
  flipBinaryBit,
  getInnerHexagramBinary,
  num2bagua,
  tiangan2num,
  trigrams2fullGua,
} from "./utils.ts";
import { FastMCP } from "fastmcp";
import { z } from "zod";

export const getServer = () => {
  const server = new FastMCP({
    name: "Plum Blossom MCP",
    version: "0.0.1",
    instructions: "梅花易数MCP服务器，可以提供梅花易数占卜相关的资源和工具。",
  });

  server.addTool({
    name: "generateGuaByYearMonthDayHour",
    description: "根据年月日时得到卦象" +
      "（卦象包括本卦、动爻（1-6））、变卦、互卦（、错卦、综卦）" +
      "并返回卦象",
    parameters: z.object({
      year: z.enum([
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
      ]).describe("农历年份对应的地支（子、丑、寅、卯等）"),
      month: z.number().int().min(1).max(12).describe(
        "农历月份（一月是1，二月是2，以此类推）",
      ),
      day: z.number().int().min(1).max(30).describe("农历日期（1-30）"),
      hour: z.enum([
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
      ]).describe("十二时辰对应的地支（子、丑、寅、卯等）"),
    }),
    execute: (args) => {
      const { year, month, day, hour } = args;

      // convert year and hour to numbers
      const yearNum = tiangan2num(year);
      const hourNum = dizhi2num(hour);

      // 年月日为上卦。年月日加时总数为下卦。
      const upperGuaNum = (yearNum + month + day) % 8 || 8;
      const lowerGuaNum = (yearNum + month + day + hourNum) % 8 || 8;
      const changingLine = (yearNum + month + day + hourNum) % 6 || 6;

      const upperGua = num2bagua(upperGuaNum);
      const lowerGua = num2bagua(lowerGuaNum);

      const benGua = trigrams2fullGua(upperGua, lowerGua);

      // Calculate Bian Gua
      const benGuaBinaryUpper = bagua2binary(upperGua);
      const benGuaBinaryLower = bagua2binary(lowerGua);
      const benGuaBinary = benGuaBinaryUpper + benGuaBinaryLower;
      const bianGuaBinary = flipBinaryBit(benGuaBinary, changingLine);
      const { upper: bianUpperGua, lower: bianLowerGua } = binary6ToTrigrams(
        bianGuaBinary,
      );
      const bianGua = trigrams2fullGua(bianUpperGua, bianLowerGua);

      // Calculate Hu Gua
      const { upper: huUpperBinary, lower: huLowerBinary } =
        getInnerHexagramBinary(benGuaBinary);
      const huUpperGua = binary3ToBagua(huUpperBinary);
      const huLowerGua = binary3ToBagua(huLowerBinary);
      const huGua = trigrams2fullGua(huUpperGua, huLowerGua);

      const result =
        `本卦: ${benGua}, 动爻: ${changingLine}, 变卦: ${bianGua}, 互卦: ${huGua}`;

      return Promise.resolve(result);
    },
  });

  return server;
};
