import axios from "axios";

const ERR_OK = 0;
const baseURL =
  process.env.NODE_ENV === "production" ? "http://110.40.179.41" : "/";

// const baseURL = "/";
axios.defaults.baseURL = baseURL;
// axios.defaults.timeout = 5000;
export function get(url, params) {
  return axios
    .get(url, { params })
    .then(res => {
      const serverData = res.data;
      if (serverData.code === ERR_OK) {
        return serverData.result;
      }
    })
    .catch(e => console.log(e));
}
