import axios, { AxiosInstance, AxiosResponse } from "axios";

function createInstance(): AxiosInstance {
  const instance = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
      "Content-type": "application/json"
    }
  })
  return instance;
};

function responseData<T>(resp: Promise<AxiosResponse>): Promise<T> {
  return resp.then((res) => {
    return res.data;
  })
}

export function get<T>(url: string): Promise<T> {
  return responseData(createInstance().get(url));
}
