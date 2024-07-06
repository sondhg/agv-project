import "react-pro-sidebar/dist/css/styles.css";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import { FaList, FaGithub } from "react-icons/fa";
import { MdDashboard, MdManageAccounts } from "react-icons/md";
import sidebarBg from "../../assets/bg2.jpg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Admin.scss";

const SideBar = ({ image, collapsed, toggled, handleToggleSidebar }) => {
  const navigate = useNavigate();
  return (
    <>
      <ProSidebar
        image={sidebarBg}
        collapsed={collapsed}
        toggled={toggled}
        breakPoint="md"
        onToggle={handleToggleSidebar}
      >
        <SidebarHeader>
          <div
            style={{
              padding: "24px",
              textTransform: "uppercase",
              fontWeight: "bold",
              fontSize: 14,
              letterSpacing: "1px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            Back to Home page
          </div>
        </SidebarHeader>

        <SidebarContent>
          <Menu iconShape="circle">
            <MenuItem
              icon={<MdDashboard />}
              //   suffix={<span className="badge red">New</span>}
            >
              Dashboard
              <Link to="/admin" />
            </MenuItem>
            {/* <MenuItem icon={<FaGem />}>Components</MenuItem> */}
          </Menu>
          <Menu iconShape="circle">
            <SubMenu
              //   suffix={<span className="badge yellow">3</span>}
              //   icon={<FaRegLaughWink />}
              icon={<FaList />}
              title="Orders"
            >
              <MenuItem>
                Manage Orders
                <Link to="/admin/manage-orders" />
              </MenuItem>
              <MenuItem>
                Real-time Data Display
                <Link to="/admin/agv-params-display" />
              </MenuItem>
            </SubMenu>
          </Menu>
          <Menu iconShape="circle">
            <SubMenu icon={<MdManageAccounts />} title="Users">
              <MenuItem>
                Manage Users
                <Link to="/admin/manage-users" />
              </MenuItem>
            </SubMenu>
          </Menu>
        </SidebarContent>

        <SidebarFooter style={{ textAlign: "center" }}>
          <div
            className="sidebar-btn-wrapper"
            style={{
              padding: "20px 24px",
            }}
          >
            <a
              href="https://github.com/sondhg/frontend-prj1-son"
              target="_blank"
              className="sidebar-btn"
              rel="noopener noreferrer"
            >
              <FaGithub />
              <span
                style={{
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                GUI Source Code
              </span>
            </a>
          </div>
        </SidebarFooter>
      </ProSidebar>
    </>
  );
};

export default SideBar;
