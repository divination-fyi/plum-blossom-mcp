import {
  bagua2binary,
  binary3ToBagua,
  binary6ToTrigrams,
  flipBinaryBit,
  getHuGuaBinary,
  num2bagua,
  trigrams2fullGua,
} from "./gua.ts";
import { dizhi2num, gregorianYearToNongli, timeToDizhi } from "./dizhi.ts";
import { interpretGua } from "./interpretGua.ts"; // Add this import
import { FastMCP } from "fastmcp";
import { z } from "zod";

export const getServer = () => {
  const server = new FastMCP({
    name: "Plum Blossom MCP",
    version: "0.0.1",
    instructions:
      "此梅花易数MCP服务器提供一套用于梅花易数占卜的工具。它提供解释卦象、根据时间生成卦象、将公历年份转换为农历年份以及将时间转换为传统时辰的功能。",
  });

  server.addTool({
    name: "interpretGua",
    description:
      "根据给定的本卦和动爻，提供梅花易数解释。此工具帮助用户理解特定占卜结果的含义和启示。",
    parameters: z.object({
      benGua: z.string().describe("本卦的中文名称（例如：乾为天）"),
      dongYao: z.number().int().min(1).max(6).describe("动爻（1-6）"),
    }),
    execute: async (args) => {
      const { benGua, dongYao } = args;
      const interpretation = await interpretGua(benGua, dongYao);
      return Promise.resolve(interpretation);
    },
  });

  server.addTool({
    name: "generateGuaByYearMonthDayHour",
    description:
      "根据农历的年、月、日和对应的时辰，生成一套完整的卦象（本卦、变卦、互卦）和动爻。此工具对于使用时间起卦法进行梅花易数占卜至关重要。",
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
      const yearNum = dizhi2num(year);
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
      const { upper: huUpperBinary, lower: huLowerBinary } = getHuGuaBinary(
        benGuaBinary,
      );
      const huUpperGua = binary3ToBagua(huUpperBinary);
      const huLowerGua = binary3ToBagua(huLowerBinary);
      const huGua = trigrams2fullGua(huUpperGua, huLowerGua);

      return Promise.resolve(
        `本卦: ${benGua}, 动爻: ${changingLine}, 变卦: ${bianGua}, 互卦: ${huGua}`,
      );
    },
  });

  server.addTool({
    name: "gregorianYearToNongli",
    description:
      "将公历年份转换为对应的农历天干、地支和生肖。这对于将现代日期与中国传统历法系统对齐非常有用。",
    parameters: z.object({
      year: z.number().int().min(1).describe("公历年份"),
    }),
    execute: (args) => {
      const { year } = args;
      const { tiangan, dizhi, zodiac } = gregorianYearToNongli(year);
      return Promise.resolve(
        `天干: ${tiangan}, 地支: ${dizhi}, 生肖: ${zodiac}`,
      );
    },
  });

  server.addTool({
    name: "timeToShichen",
    description:
      "将给定时间（hh:mm格式）转换为对应的中国传统十二时辰（每两小时一个时辰）。此工具用于确定占卜计算的正确时辰。",
    parameters: z.object({
      time: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/).describe(
        "时间，hh:mm格式（例如：08:30）",
      ),
    }),
    execute: (args) => {
      const { time } = args;
      const [hourStr, minuteStr] = time.split(":");
      const hour = parseInt(hourStr, 10);
      const minute = parseInt(minuteStr, 10);

      const shichen = timeToDizhi(hour, minute);
      return Promise.resolve(`时辰: ${shichen}`);
    },
  });
  return server;
};
