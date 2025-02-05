// import { fetchUtils } from "react-admin";
// import simpleRestProvider from "ra-data-simple-rest";
// import { API_BASE_URL } from "./config";

// const fetchJson = (url: string, options = {}) => {
//   if (!options.headers) {
//     options.headers = new Headers({ Accept: "application/json" });
//   }
//   const accessToken = localStorage.getItem("access");
//   if (accessToken) {
//     options.headers.set("Authorization", `Bearer ${accessToken}`);
//   }

//   const urlObj = new URL(url);
//   urlObj.search = "";
//   url = urlObj.toString();
  
//   return fetchUtils.fetchJson(url, options);
// };

// const dataProvider = simpleRestProvider(API_BASE_URL, fetchJson);
// console.log(dataProvider);
// export default dataProvider;

import { fetchUtils } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";
import { API_BASE_URL } from "./config";

const fetchJson = (url: string, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }
  const accessToken = localStorage.getItem("access");
  if (accessToken) {
    options.headers.set("Authorization", `Bearer ${accessToken}`);
  }

  const urlObj = new URL(url);
  urlObj.search = "";
  url = urlObj.toString();
  
  return fetchUtils.fetchJson(url, options);
};

const dataProvider = simpleRestProvider(API_BASE_URL, fetchJson);
console.log(dataProvider);
export default dataProvider;

