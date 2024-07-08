import { NavLink, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { logout } from "../../services/apiServices";
import { toast } from "react-toastify";
import { doLogout } from "../../redux/action/userAction";


const Header = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const account = useSelector((state) => state.user.account);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const handleLogOut = async () => {
    let res = await logout(account.email, account.refresh_token);
    if (res /* && res.EC === 0 */) {
      //need to clear data redux
      dispatch(doLogout());
      navigate("/login");
    } else {
      toast.error("Error, cannot log out");
    }
  };

  return (
    <Navbar
      bg="dark"
      data-bs-theme="dark"
      expand="lg"
      className="bg-body-tertiary"
    >
      <Container>
        <NavLink to="/" className="navbar-brand">
          AGV System
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
            <NavLink to="/admin" className="nav-link">
              Admin
            </NavLink>
            <Nav>
              {/* Nếu isAuthenticated = true, tức là ng dùng đã đăng nhập rồi 
              thì mới hiện cái dropdown, còn ko thì chỉ hiện 2 button */}
              {isAuthenticated === false ? (
                <>
                  <Button
                    variant="info"
                    className="btn-login mx-3"
                    onClick={() => handleLogin()}
                  >
                    Log in
                  </Button>
                  <Button
                    variant="secondary"
                    className="btn-signup mx-3"
                    onClick={() => handleRegister()}
                  >
                    Sign up
                  </Button>
                </>
              ) : (
                <NavDropdown title="Account" id="basic-nav-dropdown">
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                  <NavDropdown.Item onClick={() => handleLogOut()}>
                    Log out
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
