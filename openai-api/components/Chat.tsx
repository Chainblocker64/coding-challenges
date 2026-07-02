"use client";

import { sendChat } from "@/actions/chat";
import { Message } from "@/types/chat";
import { useState } from "react";

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  async function handleSubmit(event: React.SubmitEvent) {
    event.preventDefault();
    const appendedMessages: Message[] = [
      ...messages,
      { role: "user", content: input },
    ];
    setMessages(appendedMessages);
    setInput("");

    const response = await sendChat(appendedMessages);
    setMessages([...appendedMessages, response]);
  }

  return (
    <>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>
            <strong>{message.role}: </strong>
            {message.content}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Type your message here..."
        ></input>
        <button type="submit">Send</button>
      </form>
    </>
  );
}
