import { useContext, useEffect, useState } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import Swal from "sweetalert2";
import EditProfile from "./Components/Admin/EditProfile";
import Detail from "./Components/Detail";
import NavbarMenu from "./Components/Navbar";
import AddProduct from "./Pages/Admin/AddProduct";
import Admin from "./Pages/Admin/Admin";
import ProfilesPartner from "./Pages/Admin/ProfilePartner";
import Home from "./Pages/Home";
import Profile from "./Pages/User/ProfileUser";
import {
  PrivateRouteAdmin,
  PrivateRouteLogin,
  PrivateRouteUser,
} from "./config/privateRoute";
import TransactionUser from "./Pages/User/TransactionUser";
import { useSelector } from "react-redux";

function App() {
  const NotFoundPage = () => {
    const location = useLocation();

    useEffect(() => {
      Swal.fire({
        title: "Halaman tidak ditemukan",
        text: `Halaman "${location.pathname}" tidak ditemukan.`,
        icon: "error",
      });
    }, [location]);

    return <Navigate to="/" />;
  };
  
  
  
 

  return (
    <Router>
      <div style={{overflowX:"hidden"}}>
      {/* <Container fluid className={state?.user.role === "As Partner"  ? "backgroundImageAdmin" : state?.user.role === "As User" ? "backgroundImage" : "backgroundImage"}> */}
      <NavbarMenu />
      {/* </Container> */}
    
          <Routes>

            <Route path="*" element={<NotFoundPage />} />
            <Route element={<PrivateRouteLogin />}>
              <Route element={<PrivateRouteUser />}>
                
              <Route path="/Product/:id" element={<Detail />} />
              
              <Route path="/transaction" element={<TransactionUser />} />
                <Route path="/Profile"  element={<Profile />} />
                
              </Route>
              <Route element={<PrivateRouteAdmin />}>
                <Route path="/admin" element={<Admin />} />
                <Route path="/ProfilePartner" element={<ProfilesPartner />} />
                <Route path="/AddProduct" element={<AddProduct />} /> 
              </Route>
            </Route>

            <Route path="/" element={<Home />} />
                <Route path="/EditProfile" element={<EditProfile />} /> 
          </Routes>
      </div>
    </Router>
  );
}

export default App;
