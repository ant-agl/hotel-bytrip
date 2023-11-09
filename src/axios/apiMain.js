import axios from "axios";

export default axios.create({
  baseURL: "https://bytrip.ru/php",
  headers: {
    "Content-Type": "multipart/form-data",
    "X-Auth": localStorage.token ?? "",
  },
});
