import { ChatOpenAI } from "@langchain/openai";

const model = new ChatOpenAI({
  model: "gpt-4o-mini",
  temperature: 1,
  apiKey: process.env.OPENAI_API_KEY,
});

// JSON schema for structured output
const jokesSchema = {
  name: "joke",
  description: "Joke to tell user.",
  parameters: {
    title: "Joke",
    type: "object",
    properties: {
      setup: { type: "string", description: "The setup for the joke" },
      punchline: { type: "string", description: "The joke's punchline" },
      rating: {
        type: "number",
        description: "How funny the joke is from 1 to 10",
      },
    },
    required: ["setup", "punchline", "rating"],
  },
};

const structuredLLM = model.withStructuredOutput(jokesSchema, { name: "joke" });
// console.log(await structuredLLM.invoke("Tell me a joke"));

// Using openAI's JSON mode

const jsonModeStructuredLLM = model.withStructuredOutput(jokesSchema, {
  method: "json_mode",
  name: "joke",
});

// console.log(await jsonModeStructuredLLM.invoke("Tell me a joke"));

const structuredLLMWithRawResponse = model.withStructuredOutput(jokesSchema, {
  includeRaw: true,
  name: "joke",
});

console.log(await structuredLLMWithRawResponse.invoke("Tell me a joke"));
