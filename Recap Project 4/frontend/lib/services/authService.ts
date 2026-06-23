import { cookies } from "next/headers";

export async function isAuthenticated() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token");

  return accessToken ? true : false;
}
