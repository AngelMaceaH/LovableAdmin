import api from "@/lib/axios";
import { IResponse } from "@/types";

export async function loginUser(
  user: string,
  password: string
): Promise<IResponse> {
  try {
    const res = await api.post("access", { user, password });
    return res.data;
  } catch {
    return {
      success: false,
      message: "El usuario y/o contraseña incorrectos",
    };
  }
}

export async function menu(token: string): Promise<IResponse> {
  try {
    const res = await api.post("menus", {}, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    

    return res.data;
  } catch (error) {
    return {
      success: false,
      message: "Error al obtener el menú",
    };
  }
}
