import { fetchUtils, AuthProvider } from "react-admin";
import { API_BASE_URL } from "./config";

interface LoginParams {
  username: string;
  password: string;
}

// const authProvider: AuthProvider = {
//   login: async ({ username, password }: LoginParams): Promise<void> => {
//     const phone = username;
//     const request = new Request(`${API_BASE_URL}/api/token/`, {
//       method: "POST",
//       body: JSON.stringify({ phone, password }),
//       headers: new Headers({
//         "Content-Type": "application/json",
//         "Accept": "application/json",
//       }),
//     });
//     console.log(request);
//     try {
//       const { json } = await fetchUtils.fetchJson(request);
//       localStorage.setItem("access", json.acces);
//       localStorage.setItem("refresh", json.refresh);
//     } catch {
//       return await Promise.reject(new Error("Login failed"));
//     }
//   },
//   logout: (): Promise<void> => {
//     localStorage.removeItem("access");
//     localStorage.removeItem("refresh");
//     return Promise.resolve();
//   },
//   checkAuth: (): Promise<void> =>
//     localStorage.getItem("access")
//       ? Promise.resolve()
//       : Promise.reject({ message: "No authenticated" }),
//   checkError: (error: any): Promise<void> => {
//     const status: number = error.status;
//     if (status === 401 || status === 403) {
//       localStorage.removeItem("access");
//       localStorage.removeItem("refresh");
//       return Promise.reject();
//     }
//     return Promise.resolve();
//   },
//   getPermissions: (): Promise<any> => Promise.resolve(),
// };
const authProvider: AuthProvider = {
  async login({ username, password }: LoginParams) {
    const request = new Request(`${API_BASE_URL}/api/token/`, {
      method: "POST",
      body: JSON.stringify({ phone: username, password }),
      headers: new Headers({ "Content-Type": "application/json" }),
    });
    let response;
    try {
      response = await fetch(request);
    } catch (_error) {
      throw new Error("Network error");
    }
    if (response.status < 200 || response.status >= 300) {
      throw new Error(response.statusText);
    }
    const auth = await response.json();
    localStorage.setItem("access", JSON.stringify(auth.access));
    localStorage.setItem("refresh", JSON.stringify(auth.refresh));
  },
  async logout() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
  },
  async checkAuth() {
    if (!localStorage.getItem("refresh")) {
      throw new Error();
    }
  },
  async checkError(error) {
    const status = error.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      throw new Error();
      // const error = new Error();
      // error.redirectTo = "/credentials-required";
      // throw error;
    }
  },
};

export default authProvider;
