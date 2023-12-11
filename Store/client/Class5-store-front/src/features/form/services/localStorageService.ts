import { jwtDecode } from "jwt-decode";
import { logedInUser } from "../../users/interfaces/UserInterface";

export const setItem = (key: string, value: string) =>
  localStorage.setItem(key, value);

export const getToken = () => localStorage.getItem("token") || null;

export const getUser = (): logedInUser | null => {
  const token = getToken();
  if (!token) return null;
  return jwtDecode(token);
};

export const removeToken = () => localStorage.removeItem("token");
