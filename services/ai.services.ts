import groq from "../config/ai";
import { ServerError } from "../errors/server-error";
import { TaskModel } from "../models/task.model";
import errMsg from "../utils/errMsg";

export async function post(input: TaskModel) {
  try {
    const data = await groq.chat.completions.create({
      model: "llama3-70b-8192",
      temperature: 1,
      max_tokens: 1024,
      top_p: 1,
      stream: false,
      stop: null,
      messages: [
        {
          role: "system",
          content:
            "You are from New York. And you give short answers in a no-nonsense manner.",
        },
        {
          role: "user",
          content: `What is the best way to ${input.title.toLowerCase()}?`,
        },
      ],
    });
    return data.choices[0].message.content;
  } catch (e) {
    throw new ServerError(`POST: ${errMsg(e)}`);
  }
}
