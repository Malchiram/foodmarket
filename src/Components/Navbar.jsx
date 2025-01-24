import { faBurger, faDashboard, faDoorOpen, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  useEffect, useState } from "react";
import { Badge, Button, Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Icon from "../assets/waysfood/Icon.svg";
import Vect from "../assets/waysfood/Vector.png";
import Login from "./Login";
import Register from "./Register";
import { logoutUser } from "../utils/auth";

function NavbarMenu({ className }) {
  const [show, setShowLogin] = useState(false);
  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);
  const [showReg, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
const dispatch = useDispatch();

  const { isLogin,role,user } = useSelector((state) => state?.user);
  const { orderLength } = useSelector((state) => state?.order);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  const handleOrder = () => {
    navigate("/transaction")
  }
  const [datas, setdatas] = useState(user);
  useEffect(() => {
    setdatas(user)
  
  
  }, [user]);
  
  
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
          {isLogin === true ? (
            role === "As User" ? (
              <Navbar.Collapse id="navbarScroll">
                <Nav
                  className="ms-auto"
                  navbarScroll
                >
                  <div className="containerBadge" onClick={handleOrder}>
                    <img src={Vect} alt="" className="imgUserBucket" />

                      <Badge bg="danger" className="badge">{orderLength}</Badge>
                  </div>
                  <NavDropdown title={<img src={datas?.image} alt="" className="imgPartnerUser" />}>
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
            ) : role === "As Partner" ? (
                <Navbar.Collapse id="navbarScroll" >
                  <Nav  className="ms-auto " navbarScroll >
                    <NavDropdown   title={
                      <img src={datas?.image} alt="" className="imgPartnerUser" />
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
