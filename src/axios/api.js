import axios from "axios";

export default axios.create({
  baseURL: "https://hotel.bytrip.ru/php",
  headers: {
    "X-Auth": localStorage.token ?? "",
  },
});
