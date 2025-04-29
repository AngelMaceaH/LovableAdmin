"use server";

import { cookies } from "next/headers";
import { loginUser } from "@/api/auth";
export async function loginAction(user: string, password: string) {
  const result = await loginUser(user, password);
  if (!result.success || !result.token) {
    return {
      success: false,
      message: result.message || "El usuario y/o contraseña incorrectos",
    };
  }
  (await cookies()).set("session-token", result.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return { success: true, message: "Inicio de sesión exitoso" };
}
