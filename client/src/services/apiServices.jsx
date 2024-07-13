// baseURL: "http://localhost:8081" của mock json-server

import axios from "../utils/axiosCustomize"; //axios này là hàm instance, cách đặt tên ko quan trọng
import { v4 as uuidv4 } from "uuid";

const postCreateNewOrder = (
  vehicle_id,
  previous_node,
  next_node,
  load_amount,
  quick_note
) => {
  const form = new FormData();
  form.append("id", uuidv4());
  form.append("vehicle_id", vehicle_id);
  form.append("previous_node", previous_node);
  form.append("next_node", next_node);
  form.append("load_amount", load_amount);
  form.append("quick_note", quick_note);
  form.append("is_active", true);
  form.append("connected", true);
  form.append("vehicle_model", "Model X");
  form.append("guidance_type", "Optical Tape");

  return axios.post("/orders-draft", form, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
//cần phần headers thì mới chạy đc, vì json-server của mình ko hoạt động với formdata giống video

const getAllOrders = () => {
  return axios.get("/orders-draft");
};

const putUpdateOrder = (
  id,
  vehicle_id,
  previous_node,
  next_node,
  load_amount,
  quick_note
) => {
  const form = new FormData();
  //ko truyền vehicle_id vào props vì ta ko muốn người dùng edit trường đó khi update
  //cần truyền biến id để biết đang xét order nào
  form.append("id", id);
  form.append("vehicle_id", vehicle_id);
  form.append("previous_node", previous_node);
  form.append("next_node", next_node);
  form.append("load_amount", load_amount);
  form.append("quick_note", quick_note);
  form.append("is_active", true);
  form.append("connected", true);
  form.append("vehicle_model", "Model X");
  form.append("guidance_type", "Optical Tape");

  return axios.put(`/orders-draft/${id}`, form, {
    headers: {
      "Content-Type": "application/json", //cần database để sửa, có thể bỏ headers
    },
  });
};

const deleteOrder = (orderId) => {
  return axios.delete(`/orders-draft/${orderId}`, { data: { id: orderId } });
};

const proceedOrder = (order) => {
  return axios.post("/agvs", order, {
    headers: {
      "Content-Type": "application/json",
    }, //biến order sẽ là 1 object, cần nghĩ cách post giống hàm postCreateNewOrder
  });
};

const getDisplayAgvParams = () => {
  return axios.get("/agv-parameters-display");
};
//có thể dùng cho TableDisplayAgvParams, nhưng code cũ chạy ổn r nên thôi

//Phần dưới đây dùng cho User/Account
const postCreateNewUser = (email, password, username, role) => {
  const form = new FormData();
  form.append("email", email);
  form.append("password", password);
  form.append("username", username);
  form.append("role", role);

  return axios.post("/users", form, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const getAllUsers = () => {
  return axios.get("/users");
};

const putUpdateUser = (id, password, username, role) => {
  const form = new FormData();
  //cần truyền biến id để biết đang xét user nào
  form.append("id", id);
  form.append("password", password);
  form.append("username", username);
  form.append("role", role);

  return axios.put(`/users/${id}`, form, {
    headers: {
      "Content-Type": "application/json", //cần database để sửa, có thể bỏ headers
    },
  });
};

const deleteUser = (userId) => {
  return axios.delete(`/users/${userId}`, { data: { id: userId } });
};

//Dưới đây là cho Login
const postLogin = (userEmail, userPassword) => {
  return axios.post("/login", {
    email: userEmail,
    password: userPassword,
    delay: 5000,
  });
  //được thêm vào qua chức năng Manage User
};

const postRegister = (email, password, username) => {
  return axios.post("/register", {
    email,
    password,
    username,
  });
};

const logout = (email, refresh_token) => {
  return axios.post("/logout", { email, refresh_token });
};

export {
  //AGV
  postCreateNewOrder,
  getAllOrders,
  putUpdateOrder,
  deleteOrder,
  proceedOrder,
  getDisplayAgvParams,

  //User
  postCreateNewUser,
  getAllUsers,
  putUpdateUser,
  deleteUser,

  //Login
  postLogin,

  //Register
  postRegister,

  //Log out
  logout,
};
