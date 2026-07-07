export interface Message {
  role: Role;
  content: string;
}

export type ChatStore = Record<string, Message[]>;

export type Role = "user" | "assistant";
