import type { AuthProvider } from "react-admin";
import { jwtDecode } from "jwt-decode";

const callRefreshToken = async () => {
  const refreshToken = localStorage.getItem("refresh");
  try {
    const res = new Request(
      `${import.meta.env.VITE_SIMPLE_REST_URL}/api/token/refresh/`,
      {
        method: "POST",
        body: JSON.stringify({ refresh: `${refreshToken}` }),
        headers: new Headers({ "Content-Type": "application/json" }),
      },
    );
    const response = await fetch(res);
    if (response.status === 200) {
      const auth = await response.json();
      localStorage.setItem("access", auth.access);
    }
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};

const authProvider: AuthProvider = {
  // send username and password to the auth server and get back credentials
  async login({ username, password }) {
    const request = new Request(
      `${import.meta.env.VITE_SIMPLE_REST_URL}/api/token/`,
      {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: new Headers({ "Content-Type": "application/json" }),
      },
    );
    let response;
    try {
      response = await fetch(request);
    } catch (_error) {
      throw new Error("Network error");
    }
    if (response.status < 200 || response.status >= 300) {
      throw new Error();
    }
    const auth = await response.json();
    localStorage.setItem("access", auth.access);
    localStorage.setItem("refresh", auth.refresh);
  },
  // when the dataProvider returns an error, check if this is an authentication error
  async checkError(error) {
    /** ... **/
    const status = error.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
    }
  },
  // when the user navigates, make sure that their credentials are still valid
  async checkAuth() {
    /** ... **/
    const accessToken = localStorage.getItem("access");
    if (!accessToken) {
      throw new Error();
    }
    const decoded = jwtDecode(accessToken); // get expiry time
    const tokenExpiration = decoded.exp;
    const now = Date.now() / 1000;
    if (tokenExpiration < now) {
      await callRefreshToken();
    }
  },
  // remove local credentials and notify the auth server that the user logged out
  async logout() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
  },
  // get the user's profile
  //   async getIdentity() {
  /** ... **/
  //   },
  // check whether users have the right to perform an action on a resource (optional)
  //   async canAccess() {
  /** ... **/
  //   },
};

export default authProvider;
