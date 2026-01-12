import axios, { AxiosInstance } from "axios";

import { configs } from "../index";
import errorHandler from "./error-handler";

const createAxiosInstance = (baseURL: string = ""): AxiosInstance => {
  const instance = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
      apiKey: configs.API_KEY,
    },
  });

  applyInterceptor(instance);
  return instance;
};

const applyInterceptor = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use(async (request) => {
    // const sessionClient: any = await getSession();
    // const sessionServer: any =
    //   typeof window == "undefined"
    //     ? ((await getServerSession(auth)) as any)
    //     : null;

    // const token = sessionClient?.user?.token || sessionServer?.token;
    // if (token) {
    //   request.headers.Authorization = `Bearer ${token}`;
    // }

    return request;
  });
  axiosInstance.interceptors.response.use((response) => response, errorHandler);
};

export const Base = createAxiosInstance(configs.API_BASE);
