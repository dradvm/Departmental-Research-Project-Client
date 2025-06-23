import axios from "axios";
import { create } from "lodash";
import { getSession } from "next-auth/react";


const createAxios = async (
  route = "",
  contentType = "application/json",
  timeout = 30000
) => {
  //--------------
  let session = null;
  while (!session) {
    session = await getSession();
    await new Promise((res) => setTimeout(res, 100));
  }
  console.log(">>>check session: ", session)
  const token = session?.user.access_token
  //--------------
  const instance = axios.create({
    baseURL: `http://localhost:3001/api${route}`,
    timeout: timeout,
    headers: {
      "Content-Type": contentType,
    },
  });

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

//const axiosInstance = createAxios();


//export default axiosInstance;
// axiosInstance.ts
export const getAxiosInstance = async () => await createAxios();

export { createAxios };
