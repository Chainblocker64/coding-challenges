import { useEffect } from "react";
import "./App.css";
import { socket } from "./socket";

function App() {
  useEffect(() => {
    socket.connect();

    socket.emit("login", { connected: true, test: 12345 });

    const onLogin = ({
      success,
      userId,
    }: {
      success: boolean;
      userId: number;
    }) => {
      console.log(`Login: ${success}, User ID: ${userId}`);
    };

    socket.on("login", onLogin);

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h1>Hide and Seek</h1>
    </div>
  );
}

export default App;
