import { Message } from "@/types/chat";

export default function Chat({
  messages,
  initialInput,
  onInputChange,
  handleSubmit,
}: {
  messages: Message[];
  initialInput: string;
  onInputChange: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: () => Promise<void>;
}) {
  const onSubmit = async (event: React.SubmitEvent) => {
    event.preventDefault();
    await handleSubmit();
  };

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
      <form onSubmit={onSubmit}>
        <input
          value={initialInput}
          onChange={(event) => onInputChange(event.target.value)}
          placeholder="Type your message here..."
          required
        ></input>
        <button type="submit">Send</button>
      </form>
    </>
  );
}
