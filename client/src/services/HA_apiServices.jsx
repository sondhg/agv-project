import axios from "../utils/HA_axiosCustomize"; //axios này là hàm instance, cách đặt tên ko quan trọng
import { v4 as uuidv4 } from "uuid";

const HA_proceedOrder = (order) => {
  return axios.post("/agvs", order, {
    headers: {
      "Content-Type": "application/json",
    }, //biến order sẽ là 1 object, cần nghĩ cách post giống hàm postCreateNewOrder
  });
};

const HA_postLogin = (userEmail, userPassword) => {
  return axios.post(
    "/login",
    {
      email: userEmail,
      password: userPassword,
    },
    { headers: { "content-type": "application/json" } }
  );
};

const HA_postRegister = (email, password, name) => {
  return axios.post(
    "/register",
    {
      email,
      password,
      name,
    },
    { headers: { "content-type": "application/json" } }
  );
};

const HA_logout = (email, refresh_token) => {
  return axios.post(
    "/logout",
    { email, refresh_token },
    { headers: { "content-type": "application/json" } }
  );
};

export { HA_proceedOrder, HA_postLogin, HA_postRegister, HA_logout };
