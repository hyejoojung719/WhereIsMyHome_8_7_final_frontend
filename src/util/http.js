import axios from "axios";
import store from "@/store";

let instance = axios.create({
  baseURL: "http://localhost:9000/house",
  // baseURL: "http://192.168.130.85:9000/house",
  // baseURL: "http://192.168.130.74:9000/house",
});

//axios 요청 보내기 전 인터셉터
instance.interceptors.request.use((config) => {
  //헤더에 access-token 추가
  config.headers["access-token"] = store.state.userStore.token;
  return config;
});

export default instance;
