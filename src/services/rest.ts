import axios, { AxiosInstance, AxiosResponse } from "axios";
import { URL } from "./constants"

function createInstance(): AxiosInstance {
  const instance = axios.create({
    baseURL: "",
    headers: {
      "Content-Type": "application/json"
    }
  })
  return instance;
};

function postRequest<T = any, R = AxiosResponse<T>>(url: string, data?: any): Promise<R> {
  return responseData(createInstance().post(url, data));
}

async function responseData<T>(resp: Promise<AxiosResponse>): Promise<T> {
  return await (await resp).data;
}

export function get<T>(url: string): Promise<T> {
  return responseData(createInstance().get(url));
}

export function post<T>(url: string, data?: T): Promise<any> {
  return postRequest(url, data);
}

export function put<T>(url:string, data?: T): Promise<any> {
  return responseData(createInstance().put(url, data));
}
