import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Application from "./Application.jsx";
import Home from "./components/Home/Home.jsx";
import ManageOrder from "./components/Admin/Content/ManageOrders/ManageOrder.jsx";
import Admin from "./components/Admin/Admin.jsx";
import DashBoard from "./components/Admin/Content/Dashboard/DashBoard.jsx";
import Login from "./components/Auth/Login.jsx";
import Register from "./components/Auth/Register.jsx";
import { Suspense } from "react";
import PrivateRoute from "./routes/PrivateRoute.jsx";

const NotFound = () => {
  return (
    <div className="alert alert-danger ">
      404 Not Found: No data matches this URL
    </div>
  );
};

const Layout = (props) => {
  return (
    <div className="bg-dark text-white">
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Application />}>
            <Route index element={<Home />} />
          </Route>

          <Route
            path="/admin"
            //tạm tắt private route để xem đc Admin, khi hoàn thành all thì uncomment
            element={
              // <PrivateRoute>
              <Admin />
              // </PrivateRoute>
            }
          >
            <Route index element={<DashBoard />} />
            <Route path="manage-orders" element={<ManageOrder />} />
          </Route>

          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={1000}
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
      </Suspense>
    </div>
  );
};

export default Layout;
