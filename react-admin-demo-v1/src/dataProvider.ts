import simpleRestProvider from "ra-data-simple-rest";
import { fetchUtils, DataProvider } from "react-admin";
// export const dataProvider = simpleRestProvider(
//   import.meta.env.VITE_SIMPLE_REST_URL,
// );

// export const dataProvider = {
//   getList: (resource, params) => Promise,
//   // get a single record by id
//   getOne: (resource, params) => Promise,
//   // get a list of records based on an array of ids
//   getMany: (resource, params) => Promise,
//   // get the records referenced to another record, e.g. comments for a post
//   getManyReference: (resource, params) => Promise,
//   // create a record
//   create: (resource, params) => Promise,
//   // update a record based on a patch
//   update: (resource, params) => Promise,
//   // update a list of records based on an array of ids and a common patch
//   updateMany: (resource, params) => Promise,
//   // delete a record by id
//   delete: (resource, params) => Promise,
//   // delete a list of records based on an array of ids
//   deleteMany: (resource, params) => Promise,
// };

// const fetchJson = (url: string, options = {}) => {
//   options.user = {
//     authenticated: true,
//     token: localStorage.getItem('access')
//   };
//   return fetchUtils.fetchJson(url, options)
// }

// export const dataProvider = simpleRestProvider(`${import.meta.env.VITE_SIMPLE_REST_URL}`, fetchJson)

export const dataProvider: DataProvider = {
  getList: async (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;

    const accessToken = localStorage.getItem("access");
    const url = `${import.meta.env.VITE_SIMPLE_REST_URL}/api/${resource}/?_page=${page}&_limit=${perPage}&_sort=${field}&_order=${order}`;

    const response = await fetchUtils.fetchJson(url, {
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
      }),
    });
    return {
      data: response.json,
      total: parseInt(response.headers.get("x-total-count") || "", 10),
    };
  },
};
