import { faBurger, faDoorOpen, faUser,faDashboard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { Badge, Button, Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Icon from "../assets/waysfood/Icon.svg";
import Vect from "../assets/waysfood/Vector.png";
import { useCustomQuery } from "../config/query";
import { UserContext } from "../utils/context/userContext";
import { getOrder } from "../utils/profile";
import Login from "./Login";
import Register from "./Register";

function NavbarMenu({ className }) {
  const [show, setShowLogin] = useState(false);
  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);
  const [showReg, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  const [testLength, setTestLength] = useState(0);

  const [state, dispatch] = useContext(UserContext);

  let { data: test, isLoading, isSuccess } = useCustomQuery("test", getOrder)
  useEffect(() => {
    setTestLength(test?.length || 0);
  }, [test?.length]);

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
  };

  const handleOrder = () => {
    navigate("/transaction")
  }

  useEffect(() => {
    // Lakukan refetch atau pembaruan data lainnya yang diperlukan saat test.length berubah
    // ...
  }, [testLength]);

  return (
    <>
      <Navbar className="setNav backgroundImageAdmin" >
        <Container fluid >
          <Navbar.Brand>
            <Link to="/">
              <img src={Icon} className="imageNav" alt="logo" />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          {state.isLogin === true ? (
            state.user.role === "As User" ? (
              <Navbar.Collapse id="navbarScroll">
                <Nav
                  className="ms-auto"
                  navbarScroll
                >
                  <div className="containerBadge" onClick={handleOrder}>
                    <img src={Vect} alt="" className="imgUserBucket" />
                    {!isLoading && isSuccess && test !== null && (

                      <Badge bg="danger" className="badge">{testLength}</Badge>
                    )
                    }
                  </div>
                  <NavDropdown title={<img src={state.user.image} alt="" className="imgPartnerUser" />}>
                    <NavDropdown.Item href="/Profile">
                      <FontAwesomeIcon icon={faUser} className="icsPartner" />
                      Profile</NavDropdown.Item>
                    <NavDropdown.Divider className="linePartner" />
                    <NavDropdown.Item onClick={handleLogout} className="dropPartner" style={{ letterSpacing: "1px" }}>
                      <FontAwesomeIcon icon={faDoorOpen} className="icsPartner" style={{ color: "red" }} />
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            ) : state.user.role === "As Partner" ? (
                <Navbar.Collapse id="navbarScroll" >
                  <Nav  className="ms-auto " navbarScroll >
                    <NavDropdown   title={
                      <img src={state.user.image} alt="" className="imgPartnerUser" />
                    }>
                      <NavDropdown.Item href="/admin" className="dropPartner">
                        <FontAwesomeIcon icon={faDashboard} className="icsPartner" />
                        Dashboard
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/ProfilePartner" className="dropPartner">
                        <FontAwesomeIcon icon={faUser} className="icsPartner" />
                        Profile Partner
                      </NavDropdown.Item>
                  
                      <NavDropdown.Item href="/AddProduct" className="dropPartner">
                        <FontAwesomeIcon icon={faBurger} className="icsPartner" />
                        Add Product</NavDropdown.Item>
                      <NavDropdown.Divider className="linePartner" />
                      <NavDropdown.Item onClick={handleLogout} className="dropPartner" style={{ letterSpacing: "1px" }}>
                        <FontAwesomeIcon icon={faDoorOpen} className="icsPartner" style={{ color: "red" }} />
                        Logout
                      </NavDropdown.Item>
                    </NavDropdown>
                  </Nav>
                </Navbar.Collapse>


            ) : <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Button className="loginNav" onClick={() => handleShow()}>
                  Register
                </Button>
                <Button className="regNav" onClick={() => handleShowLogin()}>
                  Login
                </Button>
              </Nav>
            </Navbar.Collapse>
          ) : (
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Button className="loginNav" onClick={() => handleShow()}>
                  Register
                </Button>
                <Button className="regNav" onClick={() => handleShowLogin()}>
                  Login
                </Button>
              </Nav>
            </Navbar.Collapse>
          )}
        </Container>
      </Navbar>
      <Register
        showReg={showReg}
        setShow={handleShow}
        handleClose={handleClose}
      />
      <Login
        show={show}
        setShowLogin={handleShowLogin}
        handleCloseLogin={handleCloseLogin}
      />
    </>
  );
}

export default NavbarMenu;
