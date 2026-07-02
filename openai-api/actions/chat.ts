"use server";

import { Message } from "@/types/chat";

export async function sendChat(messages: Message[]) {
  const url = `${process.env.OPENAI_API_URL}/chat/completions`;
  const token = process.env.OPENAI_API_KEY;

  if (!url || !token) {
    throw new Error(
      `${url ? "" : "OPENAI_API_URL is not configured! "}${token ? "" : "OPENAI_API_TOKEN is not configured!"}`,
    );
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages,
    }),
  });

  const data = await response.json();
  return data.choices[0].message;
}
