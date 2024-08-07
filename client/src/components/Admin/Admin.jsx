import SideBar from "./SideBar";
import "./Admin.scss";
import { FaBars } from "react-icons/fa";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Form from "react-bootstrap/Form";

const Admin = (props) => {
  const [collapsed, setCollapsed] = useState(true);
  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <SideBar collapsed={collapsed} />
      </div>
      <div className="admin-content">
        <div className="admin-header">
          <Form>
            <Form.Check
              type="switch"
              // label="Toggle sidebar"
              onClick={() => setCollapsed(!collapsed)}
              className="toggle-sidebar"
              id="custom-switch"
              role="button"
            />
          </Form>
        </div>
        <div className="admin-main">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default Admin;
