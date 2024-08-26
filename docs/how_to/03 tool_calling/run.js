import { ChatOpenAI } from "@langchain/openai";
import { tool } from "@langchain/core/tools";
import { z } from "zod";

const llm = new ChatOpenAI({
  model: "gpt-4o-mini",
  temperature: 0.5,
});

// const calculatorSchema = {
//   name: "calculator",
//   description: "A simple calculator tool",
//   parameters: {
//     title: "Calculator",
//     type: "object",
//     properties: {
//       operation: {
//         type: "string",
//         description: "The operation to perform",
//         enum: ["add", "subtract", "multiply", "divide"],
//       },
//       number1: {
//         type: "number",
//         description: "The first number",
//       },
//       number2: {
//         type: "number",
//         description: "The second number",
//       },
//     },
//     required: ["operation", "number1", "number2"],
//   },
// };
const calculatorSchema = z.object({
  operation: z
    .enum(["add", "subtract", "multiply", "divide"])
    .describe("The type of operation to execute."),
  number1: z.number().describe("The first number to operate on."),
  number2: z.number().describe("The second number to operate on."),
});

const calculatorTool = tool(
  async ({ operation, number1, number2 }) => {
    switch (operation) {
      case "add":
        return number1 + number2;
      case "subtract":
        return number1 - number2;
      case "multiply":
        return number1 * number2;
      case "divide":
        return number1 / number2;
      default:
        throw new Error("Invalid operation");
    }
  },
  {
    name: "calculator",
    description: "A simple calculator tool",
    schema: calculatorSchema,
  }
);

const llmWithTool = llm.bindTools([calculatorTool]);

const res = await llmWithTool.invoke("What is 2 plus 2?");

console.log(res);
