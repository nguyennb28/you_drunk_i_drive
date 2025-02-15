import { fetchUtils, DataProvider } from "react-admin";
import queryString from "query-string";
import { stringify } from "query-string";
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

// const cleanFilter = (obj: {}) => {
//   return Object.entries(obj || {}).reduce((acc, [key, value]) => {
//     if (value && value !== "undefined") {
//       console.log(key);
//       acc[key] = value;
//     }
//     return acc;
//   }, {});
// };
const cleanFilter = (obj: {}) => {
  return Object.fromEntries(
    Object.entries(obj || {}).filter(
      ([_, value]) => value !== undefined && value !== "",
    ),
  );
};

export const dataProvider: DataProvider = {
  getList: async (resource, params) => {
    const { q } = params.filter;
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const accessToken = localStorage.getItem("access");
    const query = {
      ...cleanFilter(params.filter),
      _sort: field,
      _order: order,
      _page: page,
      _limit: perPage,
    };
    // const url = `${import.meta.env.VITE_SIMPLE_REST_URL}/api/${resource}/?_page=${page}&_limit=${perPage}&_sort=${field}&_order=${order}&_filter=${q}`;
    const url = `${import.meta.env.VITE_SIMPLE_REST_URL}/api/${resource}/?${stringify(query)}`;

    const response = await fetchUtils.fetchJson(url, {
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      }),
    });
    return {
      data: response.json.data,
      total: parseInt(response.json.total),
      pageInfo: {
        hasNextPage: response.json.hasNextPage,
        hasPreviousPage: response.json.hasPreviousPage,
      },
      meta: {
        currentPage: response.json.currentPage,
        pageSize: response.json.pageSize,
      },
    };
  },
  getOne: async (resource, params) => {
    const accessToken = localStorage.getItem("access");
    const response = await fetchUtils.fetchJson(
      `${import.meta.env.VITE_SIMPLE_REST_URL}/api/${resource}/${params.id}/`,
      {
        headers: new Headers({
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        }),
      },
    );
    return { data: response.json };
  },
  getMany: async (resource, params) => {
    const accessToken = localStorage.getItem("access");
    // const query = {
    //   ids: params.ids.join(","),
    // };
    const response = await fetchUtils.fetchJson(
      `${import.meta.env.VITE_SIMPLE_REST_URL}/api/${resource}/get_many/?ids=${params.ids}`,
      {
        headers: new Headers({
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        }),
        signal: params.signal,
      },
    );
    return { data: response.json.data };
  },
  // // get the records referenced to another record, e.g. comments for a post
  // getManyReference: async (resource, params) => {},
  // // create a record
  create: async (resource, params) => {
    const accessToken = localStorage.getItem("access");
    const response = await fetchUtils.fetchJson(
      `${import.meta.env.VITE_SIMPLE_REST_URL}/api/${resource}/`,
      {
        headers: new Headers({
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        }),
        method: "POST",
        body: JSON.stringify(params.data),
      },
    );
    return { data: response.json };
  },
  // // update a record based on a patch
  update: async (resource, params) => {
    const accessToken = localStorage.getItem("access");
    const response = await fetchUtils.fetchJson(
      `${import.meta.env.VITE_SIMPLE_REST_URL}/api/${resource}/${params.id}/`,
      {
        headers: new Headers({
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        }),
        method: "PATCH",
        body: JSON.stringify(params.data),
      },
    );
    return { data: response.json };
  },
  // // update a list of records based on an array of ids and a common patch
  // updateMany: async (resource, params) => {},
  // // delete a record by id
  delete: async (resource, params) => {
    const accessToken = localStorage.getItem("access");
    const response = await fetchUtils.fetchJson(
      `${import.meta.env.VITE_SIMPLE_REST_URL}/api/${resource}/${params.id}/`,
      {
        headers: new Headers({
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        }),
        method: "DELETE",
      },
    );
    return {
      data: response.json.data,
    };
  },
  // // delete a list of records based on an array of ids
  deleteMany: async (resource, params) => {
    const accessToken = localStorage.getItem("access");
    const response = await fetchUtils.fetchJson(
      `${import.meta.env.VITE_SIMPLE_REST_URL}/api/${resource}/delete_many/`,
      {
        headers: new Headers({
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        }),
        method: "POST",
        body: JSON.stringify({ ids: params.ids }),
      },
    );
    return { data: response.json.data };
  },
};
