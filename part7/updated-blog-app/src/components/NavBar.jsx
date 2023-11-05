import { Link, Outlet } from "react-router-dom";
import { useUser } from "../hooks";
import Notification from "./Notification";
import { Navbar, Nav, Button } from "react-bootstrap";

const padding = { padding: 10 };

const NavBar = () => {
  const user = useUser();

  const handleLogout = () => {
    user.clear();
    window.location.reload();
  };

  return (
    <div>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
        className="px-4"
      >
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Navbar.Brand>Blogs App</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#">
              <Button>
                <Link className="text-white text-decoration-none" to="/">
                  Blogs
                </Link>
              </Button>
            </Nav.Link>
            <Nav.Link href="#">
              <Button>
                <Link className="text-white text-decoration-none" to="/users">
                  Users
                </Link>
              </Button>
            </Nav.Link>
            <Nav.Link href="#">
              {user ? (
                <div>
                  <em style={padding}>{user.data?.name} logged in</em>
                  <Button
                    type="button"
                    id="logout-button"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <Link style={padding} to="/login">
                  login
                </Link>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Notification />
      <Outlet />
    </div>
  );
};

export default NavBar;
