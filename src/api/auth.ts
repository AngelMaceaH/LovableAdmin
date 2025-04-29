import api from "@/lib/axios";
import { IResponse } from "@/types";

export async function loginUser(
  user: string,
  password: string
): Promise<IResponse> {
  try {
    const res = await api.post("access", { user, password });
    return res.data;
  } catch (err: any) {
    return {
      success: false,
      message: "El usuario y/o contraseña incorrectos",
    };
  }
}
