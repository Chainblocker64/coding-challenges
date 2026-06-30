import { useEffect, useState } from "react";
import "./App.css";
import { socket } from "./socket";
import Grid from "./components/Grid";

function App() {
  const [role, setRole] = useState<string>("");

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

    const onRoleAssigned = (role: string) => {
      setRole(role);
    };

    socket.on("login", onLogin);
    socket.on("roleAssigned", onRoleAssigned);

    return () => {
      socket.off("login", onLogin);
      socket.off("roleAssigned", onRoleAssigned);
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h1>Hide and Seek</h1>
      <h3>
        {role ? `You are the ${role}` : "Waiting for other players to join..."}
      </h3>
      <Grid></Grid>
    </div>
  );
}

export default App;
