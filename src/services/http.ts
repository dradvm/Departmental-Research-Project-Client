import axios from "axios";
import { getSession } from "next-auth/react";

const createAxios = (
  route = "",
  contentType = "application/json",
  timeout = 30000
) => {
  //--------------

  //--------------
  const instance = axios.create({
    baseURL: `http://localhost:3001/api${route}`,
    timeout: timeout,
    headers: {
      "Content-Type": contentType,
    },
  });
  let token: string | undefined | null = null;
  instance.interceptors.request.use(
    async (config) => {
      if (config.url?.includes("/api/auth/session")) {
        return config;
      }
      if (!token) {
        const session = await getSession();
        token = session?.user.access_token;
      }
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (err) => Promise.reject(err)
  );
  instance.interceptors.response.use(
    (response) => {
      //   if (response.data.token && response.data.token !== "null") {
      //     localStorage.setItem("token", response.data.token);
      //   }
      return response;
    },
    (err) => {
      //   if (err.status === 403) {
      //     localStorage.removeItem("token");
      //     window.location.href = "/login";
      //   }
      return Promise.reject(err);
    }
  );

  return instance;
};

const axiosInstance = await createAxios();

export default axiosInstance;
// axiosInstance.ts

export { createAxios };
