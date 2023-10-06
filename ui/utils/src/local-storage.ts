export const setStorage = (key: string, value: any) => {
  localStorage.setItem(key, typeof value === "string" ? value : JSON.stringify(value));
};

export const getStorage = (key: string) => {
  return localStorage.getItem(key);
};

export const removeStorage = (key: string) => {
  return localStorage.removeItem(key);
};

const TOKEN = "token";

export const setTokenToLocalStorage = (token: string) => setStorage(TOKEN, token);
export const getTokenFromLocalStorage = () => getStorage(TOKEN);
export const removeTokenFromLocalStorage = () => removeStorage(TOKEN);
