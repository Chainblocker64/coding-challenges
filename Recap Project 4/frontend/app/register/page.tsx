import { registerAction } from "@/lib/actions/authActions";

export default function Register() {
  return (
    <form action={registerAction}>
      <input name="username" placeholder="Username" />
      <input name="password" placeholder="Password" />
      <button type="submit">Register</button>
    </form>
  );
}
