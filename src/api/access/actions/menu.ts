"use server";

import { cookies } from "next/headers";
import { menu } from "@/api/access/auth";
export async function menuAction(token: string) {
  const result = await menu(token);
  console.log(result);
  if (!result.success) {
    return {
      success: false,
      message: result.message || "Error al obtener el menú",
    };
  }
  return {
    success: true,
    message: "Menú obtenido con éxito",
    data: result.data,
  };
}
