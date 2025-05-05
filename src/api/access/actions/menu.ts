"use server";

import { cookies } from "next/headers";
import { menu } from "@/api/access/menu";
import { ApiMenuItem } from "@/types/Menu";
export async function menuAction(token: string) {
  const result = await menu(token);
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

export const fetchMenu = async ([_key, token]: [string, string]): Promise<
  ApiMenuItem[]
> => {
  const result = await menuAction(token);
  if (!result.success) {
    throw new Error(result.message);
  }
  return result.data as ApiMenuItem[];
};