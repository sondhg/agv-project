import axios from "../utils/axiosCustomize"; //axios này là hàm instance, cách đặt tên ko quan trọng
import { v4 as uuidv4 } from "uuid";

const postCreateNewOrder = (
  vehicle_id,
  order_date,
  start_time,
  from_node,
  to_node,
  load_amount,
  load_name
) => {
  const form = new FormData();
  form.append("vehicle_id", vehicle_id);
  form.append("order_date", order_date);
  form.append("start_time", start_time);
  form.append("from_node", from_node);
  form.append("to_node", to_node);
  form.append("load_amount", load_amount);
  form.append("load_name", load_name);
  // form.append("is_active", true);
  // form.append("connected", true);
  // form.append("vehicle_model", "Model X");
  // form.append("guidance_type", "Optical Tape");
  // form.append("id", uuidv4());

  //order-draft là viết tắt của http://localhost:8000/orders-draft nhờ axiosCustomize.jsx
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
  order_date,
  start_time,
  from_node,
  to_node,
  load_amount,
  load_name
) => {
  const form = new FormData();
  //cần truyền biến id để biết đang xét order nào
  form.append("id", id);
  form.append("vehicle_id", vehicle_id);
  form.append("order_date", order_date);
  form.append("start_time", start_time);

  form.append("from_node", from_node);
  form.append("to_node", to_node);
  form.append("load_amount", load_amount);
  form.append("load_name", load_name);
  // form.append("is_active", true);
  // form.append("connected", true);
  // form.append("vehicle_model", "Model X");
  // form.append("guidance_type", "Optical Tape");

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
  return axios.post("/orders-proceeded", order, {
    headers: {
      "Content-Type": "application/json",
    }, //biến order sẽ là 1 object, cần nghĩ cách post giống hàm postCreateNewOrder
  });
};

const getDisplayAgvParams = () => {
  return axios.get("/agv-parameters-display");
};
//có thể dùng cho TableDisplayAgvParams, nhưng code cũ chạy ổn r nên thôi

//Dưới đây là cho Login
const postLogin = (userEmail, userPassword) => {
  return axios.post(
    "/login",
    {
      email: userEmail,
      password: userPassword,
    },
    { headers: { "content-type": "application/json" } }
  );
  //được thêm vào qua chức năng Manage User
};

const postRegister = (email, password, name) => {
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

const logout = (email, refresh_token) => {
  return axios.post(
    "/logout",
    { email, refresh_token },
    { headers: { "content-type": "application/json" } }
  );
};

export {
  //AGV
  postCreateNewOrder,
  getAllOrders,
  putUpdateOrder,
  deleteOrder,
  proceedOrder,
  getDisplayAgvParams,

  //Account
  postLogin,
  postRegister,
  logout,
};
