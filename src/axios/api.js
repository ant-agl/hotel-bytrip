import axios from "axios";

export default axios.create({
  baseURL: "https://hotel.bytrip.ru/php",
  headers: {
    "Content-Type": "multipart/form-data",
    "X-Auth": localStorage.token ?? "",
  },
});
