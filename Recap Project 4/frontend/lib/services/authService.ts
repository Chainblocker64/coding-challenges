import { cookies } from "next/headers";

export async function isAuthenticated() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token");

  return accessToken ? true : false;
}

export async function fetchAPI(
  url: string,
  requestOptions: RequestInit = {},
): Promise<Response> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token");

  let options = requestOptions;

  if (accessToken) {
    options = {
      ...options,
      headers: {
        ...requestOptions.headers,
        Authorization: `Bearer ${accessToken}`,
      },
    };
  }

  return await fetch(url, options);
}
