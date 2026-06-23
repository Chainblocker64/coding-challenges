"use server";

import { apiUrl } from "@/utils/url";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  const url = apiUrl() + "/auth/login";

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: username, password: password }),
  });

  if (response.ok) {
    const { access_token: accessToken } = await response.json();

    if (!accessToken) {
      return;
    }

    const cookieStore = await cookies();
    cookieStore.set({
      name: "access_token",
      value: accessToken,
      httpOnly: true,
    });
  }
}

export async function registerAction(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  const url = apiUrl() + "/auth/register";

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: username, password: password }),
  });
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("access_token");
  redirect("/");
}
