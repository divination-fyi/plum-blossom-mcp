import { model } from "./llm.ts";
import {
  bagua2binary,
  binary3ToBagua,
  binary6ToTrigrams,
  flipBinaryBit,
  fullGua2trigrams,
  getHuGuaBinary,
  trigrams2fullGua,
} from "./gua.ts";
import { generateText } from "ai"; // Import generateText

export async function interpretGua(
  benGua: string, // This will now be the Chinese full gua name
  dongYao: number,
): Promise<string> {
  // Convert benGua (Chinese name) to trigrams, then to binary representation
  const { upper: benGuaUpperTrigram, lower: benGuaLowerTrigram } =
    fullGua2trigrams(benGua); // Use fullGua2trigrams
  const benGuaBinary = bagua2binary(benGuaUpperTrigram) +
    bagua2binary(benGuaLowerTrigram);

  // Calculate Bian Gua (变卦)
  const bianGuaBinary = flipBinaryBit(benGuaBinary, dongYao);
  const { upper: bianGuaUpperTrigram, lower: bianGuaLowerTrigram } =
    binary6ToTrigrams(bianGuaBinary);

  // Calculate Hu Gua (互卦)
  const { upper: huGuaUpperBinary, lower: huGuaLowerBinary } = getHuGuaBinary(
    benGuaBinary,
  );
  const huGuaUpperTrigram = binary3ToBagua(huGuaUpperBinary);
  const huGuaLowerTrigram = binary3ToBagua(huGuaLowerBinary);

  const prompt = `
你是一位精通梅花易数的解卦大师。请根据以下卦象信息，严格按照梅花易数的解卦步骤，详细分析并给出专业的解释。

**梅花易数解卦步骤要点：**
1.  **本卦 (主卦)**：分析本卦的卦辞、爻辞（如果动爻在本卦中），以及本卦的象征意义。明确本卦中哪一卦为“体”（主体），哪一卦为“用”（客体），并结合体用关系进行初步判断。
2.  **互卦**：分析互卦的象征意义，它代表事物发展过程中内在、隐蔽的变化和相互作用。结合互卦与本卦的体用关系进行分析。
3.  **动爻**：动爻是关键，详细分析动爻的爻辞，并结合动爻在卦中的位置（初、二、三、四、五、上）及其阴阳属性（阳动变阴，阴动变阳）对卦象的影响。重点分析动爻与体卦、用卦的关系。
4.  **变卦**：分析变卦的卦辞、爻辞（如果动爻在变卦中），以及变卦的象征意义，它代表事物最终的发展趋势和结果。明确变卦中哪一卦为“体”，哪一卦为“用”，并结合体用关系进行分析。
5.  **综合分析**：将本卦、互卦、动爻和变卦的意义融会贯通，形成一个完整、连贯的解释。在综合分析中，始终以“体用”关系为核心，指出体卦和用卦的生克比和关系，判断吉凶悔吝，并给出建议。

**卦象信息：**

*   **本卦 (主卦)**: ${
    trigrams2fullGua(benGuaUpperTrigram, benGuaLowerTrigram)
  } (上卦: ${benGuaUpperTrigram}, 下卦: ${benGuaLowerTrigram})
*   **互卦**: ${
    trigrams2fullGua(huGuaUpperTrigram, huGuaLowerTrigram)
  } (上卦: ${huGuaUpperTrigram}, 下卦: ${huGuaLowerTrigram})
*   **动爻**: 第${dongYao}爻动
*   **变卦**: ${
    trigrams2fullGua(bianGuaUpperTrigram, bianGuaLowerTrigram)
  } (上卦: ${bianGuaUpperTrigram}, 下卦: ${bianGuaLowerTrigram})

请开始你的分析：
`;

  const { text } = await generateText({
    model,
    prompt,
  });

  if (!text) {
    throw new Error("Interpretation failed, no text returned.");
  }

  return text;
}
