import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Application from "./Application.jsx";
import Home from "./components/Home/Home.jsx";
import ManageOrder from "./components/Admin/Content/ManageOrders/ManageOrder.jsx";
import Admin from "./components/Admin/Admin.jsx";
import DashBoard from "./components/Admin/Content/Dashboard/DashBoard.jsx";
import ManageDisplayAgvParams from "./components/Admin/Content/Display/ManageDisplayAgvParams.jsx";
import Login from "./components/Auth/Login.jsx";
import Register from "./components/Auth/Register.jsx";
import ManageUser from "./components/Admin/Content/ManageUsers/ManageUser.jsx";
const Layout = (props) => {
  return (
    <>
      <Routes>
        <Route>
          <Route path="/" element={<Application />}>
            <Route index element={<Home />} />
          </Route>

          <Route path="/admin" element={<Admin />}>
            {/* 3 route dưới là cho AGV */}
            <Route index element={<DashBoard />} />
            <Route path="manage-orders" element={<ManageOrder />} />
            <Route
              path="agv-params-display"
              element={<ManageDisplayAgvParams />}
            />
            {/* Route dưới là cho Accounts */}
            <Route path="manage-users" element={<ManageUser />} />
          </Route>

          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>

        </Route>
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition:Bounce
      />
    </>
  );
};

export default Layout;
