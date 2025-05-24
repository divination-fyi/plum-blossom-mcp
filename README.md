# plum-blossom-mcp

An MCP server that helps your agent perform plum blossom divination (梅花易数).

> [!NOTE]
> Note: This MCP server is based on streamable HTTP transport. Make sure your
> MCP host supports it, and set the MCP server URL as
> `https://plum-blossom-mcp.deno.dev/stream`

> [!CAUTION]
> This project/service is for research purposes only and is not intended as
> actual life guidance. We assume no direct or indirect liability for any
> damages caused by the use of this project/service.

> [!WARNING]
> At the time of writing, the MCP server is provided free of charge, but it is
> subject to change or removal at any time without notice. We do not guarantee
> its availability or reliability.

## What is Plum Blossom Divination

Plum Blossom Divination (梅花易数, Meihua Yishu) is an ancient Chinese
divination method that originated from the I Ching (易经, Book of Changes). It
is a highly sophisticated and intricate system that uses the principles of Yin
and Yang, the Five Elements, and the Bagua (八卦, Eight Trigrams) to interpret
the hidden meanings behind events and provide insights into future developments.

Unlike other divination methods that rely on complex rituals or personal
information, Plum Blossom Divination can be performed by observing seemingly
random occurrences, such as the time of day, numbers, or even the sounds of
nature. These observations are then converted into a hexagram, which is
interpreted to provide guidance and predictions.

The core principle of Plum Blossom Divination is that everything in the universe
is interconnected and follows a natural order. By understanding these patterns,
one can gain clarity and make informed decisions. It is often used for
forecasting events, understanding relationships, making business decisions, and
gaining self-knowledge.

## How This Project Works

This MCP server provides utility tools for performing plum blossom divination
(梅花易数). It handles all the heavy lifting, including the generation of guas
(卦, hexagrams) and interpretation of the results. By offloading these tasks to
the server, even a small LLM can perform divination professionally and with
reduced hallucination, ensuring more accurate and reliable predictions.

Additionally, the tools provided do not ask for any personal information related
to the exact question being asked, so privacy is preserved.

The intrepretation tool prompts an LLM
([Qwen3 32B](https://openrouter.ai/qwen/qwen3-32b)) in the backend served by
[Cerebras](https://www.cerebras.ai/) via [OpenRouter](https://openrouter.ai/).

The MCP server itself is built using [Deno](https://deno.com/) and deployed on
[Deno Deploy](https://deno.com/deploy).

## Example on How to Use It in [Cherry Studio](https://github.com/CherryHQ/cherry-studio)

1. Add a new MCP server in Cherry Studio, give it a name, select _Streamable
   HTTP_ as the type, and set the URL to
   `https://plum-blossom-mcp.deno.dev/stream`.

   ![Add MCP Server](assets/cherry-studio-add-mcp-server.png)

2. Start a new chat, and select the MCP server you just added.

![Select MCP Server](assets/cherry-studio-query.png)

3. Type your question in the chat input, send it, and wait for your prediction!

![Plum Blossom Prediction](assets/cherry-studio-response.png)
