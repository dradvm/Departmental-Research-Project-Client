import axios from "axios";
import { create } from "lodash";
import { useSession } from "next-auth/react";


const createAxios = (
  route = "",
  contentType = "application/json",
  timeout = 30000
) => {
  const instance = axios.create({
    baseURL: `http://localhost:3001/api${route}`,
    timeout: timeout,
    headers: {
      "Content-Type": contentType,
    },
  });

  //-------------------
  const { data: sessions, status } = useSession()
  console.log(">>> check data: ", sessions, status)
  const token = sessions?.access_token;

  //-------------------

  instance.interceptors.request.use(
    (config) => {
      //   const token = localStorage.getItem("token");
      //   if (token) {
      //     config.headers["Authorization"] = `Bearer ${token}`;
      //   }
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

const axiosInstance = createAxios();

export default axiosInstance;
export { createAxios };
