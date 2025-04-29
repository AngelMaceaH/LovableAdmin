"use server";

import { cookies } from "next/headers";

export async function logoutAction() {
  const cookieStore = cookies();

  (await cookieStore).set("session-token", "", {
    path: "/",
    expires: new Date(0),
  });

  (await cookieStore).set("username", "", {
    path: "/",
    expires: new Date(0),
  });

  return { success: true };
}
