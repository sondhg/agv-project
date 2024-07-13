// baseURL: "http://localhost:8000/api" --> server Hoàng Anh
import axios_HA from "../utils/HA_axiosCustomize.jsx";
const HA_proceedOrder = (order) => {
  return axios_HA.post("/agvs", order); //server của HA nên ko cần header
};
//Dưới đây là cho Login
const HA_postLogin = (userEmail, userPassword) => {
  return axios.post("/login", {
    email: userEmail,
    password: userPassword,
    delay: 5000,
  });
  //được thêm vào qua chức năng Manage User
};
const HA_postRegister = (email, password, username) => {
  return axios.post("/register", {
    email,
    password,
    username,
  });
};
const HA_logout = (email, refresh_token) => {
  return axios.post("/logout", { email, refresh_token });
};
export { HA_proceedOrder, HA_postLogin, HA_postRegister, HA_logout };
