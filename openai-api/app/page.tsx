"use client";

import { sendChat } from "@/actions/chat";
import Chat from "@/components/Chat";
import Sidebar from "@/components/Sidebar";
import { ChatStore, Message } from "@/types/chat";
import { useState } from "react";
import useLocalStorageState from "use-local-storage-state";

export default function Home() {
  const localStorageFallback = {};

  const [chats, setChats] = useLocalStorageState<ChatStore>("chats", {
    defaultValue: localStorageFallback,
    defaultServerValue: localStorageFallback,
  });
  const [activeChat, setActiveChat] = useLocalStorageState<string>(
    "activeChat",
    {
      defaultValue: "",
      defaultServerValue: "",
    }
  );
  const [input, setInput] = useState("");

  async function handleSubmit(): Promise<void> {
    const chatId = activeChat || crypto.randomUUID();

    if (!activeChat) {
      setActiveChat(chatId);
    }

    const messages = chats?.[chatId] || [];

    let appendedMessages: Message[] = [
      ...messages,
      { role: "user", content: input },
    ];

    setChats({
      ...chats,
      [chatId]: appendedMessages,
    });

    setInput("");

    const response = await sendChat(appendedMessages);

    appendedMessages = [
      ...appendedMessages,
      {
        role: response.role,
        content: response.content || "",
      },
    ];

    setChats({
      ...chats,
      [chatId]: appendedMessages,
    });
  }

  function handleSelectChat(chatId: string) {
    setActiveChat(chatId);
  }

  function handleNewChat() {
    setActiveChat("");
  }

  function handleDeleteChat(chatId: string) {
    const updatedChats = { ...chats };
    delete updatedChats[chatId];
    setChats(updatedChats);

    if (activeChat === chatId) {
      setActiveChat("");
    }
  }

  return (
    <>
      <Sidebar
        chats={chats}
        activeChat={activeChat || ""}
        onSelectChat={handleSelectChat}
        onNewChat={handleNewChat}
        onDeleteChat={handleDeleteChat}
      />
      <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
          <Chat
            messages={chats?.[activeChat || ""] || []}
            initialInput={input}
            onInputChange={setInput}
            handleSubmit={handleSubmit}
          />
        </main>
      </div>
    </>
  );
}
