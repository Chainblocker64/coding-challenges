import { loginAction } from "@/lib/actions/authActions";

export default function Login() {
  return (
    <form action={loginAction}>
      <input name="username" placeholder="Username" />
      <input name="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
}
