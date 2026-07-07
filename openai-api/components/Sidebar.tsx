import { ChatStore } from "@/types/chat";

function truncate(text: string, max = 30) {
  return text.length > max ? text.slice(0, max) + "…" : text;
}

export default function Sidebar({
  chats,
  activeChat,
  onSelectChat,
  onNewChat,
  onDeleteChat,
}: {
  chats: ChatStore | undefined;
  activeChat: string;
  onSelectChat: (chatId: string) => void;
  onNewChat: () => void;
  onDeleteChat: (chatId: string) => void;
}) {
  return (
    <aside className="fixed top-0 bottom-0 left-0 z-40 w-64 bg-gray-900 p-5 text-white flex flex-col gap-4 md:translate-x-0 translate-x-0">
      <button
        type="button"
        onClick={onNewChat}
        className="rounded px-3 py-2 text-left bg-gray-800 hover:bg-gray-700"
      >
        + New Chat
      </button>
      <nav className="space-y-1 overflow-y-auto">
        {chats &&
          Object.entries(chats).map(([chatId, messages]) => (
            <div
              key={chatId}
              className={`flex items-center rounded ${
                chatId === activeChat
                  ? "bg-gray-700 text-white"
                  : "text-gray-300 hover:bg-gray-800"
              }`}
            >
              <button
                type="button"
                onClick={() => onSelectChat(chatId)}
                className="flex-1 truncate px-3 py-2 text-left"
              >
                {truncate(messages[0]?.content ?? "New chat")}
              </button>
              <button
                type="button"
                onClick={() => {
                  if (window.confirm("Delete this chat?")) {
                    onDeleteChat(chatId);
                  }
                }}
                aria-label="Delete chat"
                className="px-2 py-2 text-gray-400 hover:text-red-400"
              >
                ×
              </button>
            </div>
          ))}
      </nav>
    </aside>
  );
}
