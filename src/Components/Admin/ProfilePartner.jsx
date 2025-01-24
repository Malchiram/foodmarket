import { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Icon from "../../assets/waysfood/Icon.svg";
import { UserContext } from "../../utils/context/userContext";
import { transactionPartner } from "../../utils/transaction";
import { useCustomQuery } from "../../config/query";
import { getProductId } from "../../utils/product";
import { useSelector } from "react-redux";
const DetailProfilePartner = () => {
  const navigate = useNavigate();
  const handleButtonProfile = () => {
    navigate("/EditProfile");
  };
  const { role,user } = useSelector((state) => state?.user);
  const [datas,setDatas] = useState(user)

  let { data: Partner, isLoading: loading } = useCustomQuery(
    ["data", user?.id],
    () => getProductId(user?.id)
  );

  const dateConvert = (params) => {
    var options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    var formattedDate = params.toLocaleDateString("en-US", options);
    return formattedDate;
  };
  let { data, isLoading } = useCustomQuery(
    "transactionPartner",
    transactionPartner, {
      staleTime: Infinity, // Data akan dianggap selalu valid (tidak basi)
      cacheTime: 1000 * 60 * 5, // Data akan tetap di-cache selama 5 menit
    }
  );

  useEffect(() => {
    setDatas(user)
  
  
  }, [user])
  

  return (
    <>
      <Container className="ProfilePartner">
        <div
          className="d-flex"
          style={{
            justifyContent: "space-between",
          }}
        >
          <div style={{ width: "70%" }}>
            <h1 className="textProfile">Profile Partner</h1>
            <div>
              <div className="d-flex" style={{ gap: "10px" }}>
                <div style={{ width: "25%" }}>
                  <img src={datas?.image} alt="" className="imageProfile" />
                </div>
                <Col md={8} className="detailProfile">
                  <div>
                    <h5>Name Partner</h5>
                    <p>{datas?.fullname}</p>
                  </div>
                  <div>
                    <h5>Email</h5>
                    <p>{datas?.email}</p>
                  </div>
                  <div>
                    <h5>Phone</h5>
                    <p>{datas?.phone}</p>
                  </div>
                </Col>
              </div>
              <div className="" style={{ width: "25%" }}>
                <button
                  onClick={handleButtonProfile}
                  style={{
                    width: "100%",
                    border: "none",
                    background: "#ffc700",
                    color: "#fff8b",
                    fontFamily: "Avenir",
                    letterSpacing: "1px",
                    borderRadius: "3px",
                    marginTop: "5px",
                  }}
                >
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
          <div style={{ width: "25%" }}>
            <h1 className="textProfile">History Order</h1>
            <div>
              {!isLoading && data?.length > 0 ? (
                data.map((item, idx) => {
                  return (
                    <>
                      <Row className="cardHistory">
                        <Col md={7} key={idx}>
                          <p className="pName" style={{ marginBottom: "4px" }}>
                            {item?.seller?.fullname}
                          </p>
                          <p className="pDate" style={{ marginBottom: "14px" }}>
                            <span>{dateConvert("2023-15-06")}</span>
                          </p>
                          <p className="pTotal">
                            Total : Rp{" "}
                            {item?.total_price.toLocaleString("en-ID")}{" "}
                          </p>
                        </Col>
                        <Col md={5}>
                          <img src={Icon} alt="" />
                          <div className="historyStatus">
                            <p>{item?.status}</p>
                          </div>
                        </Col>
                      </Row>
                    </>
                  );
                })
              ) : (
                <>
                  <h1>No order ....</h1>
                </>
              )}
            </div>
          </div>
        </div>

        <div
          style={{
            width: "100%",
            flex: "1",
            marginTop: "2rem",
            minHeight: "19rem",
          }}
        >
          <h1 className="textProfile">Product</h1>

          <div
            className="mt-1 d-flex p-1"
            style={{ gap: "10px", flex: "wrap", width: "100%" }}
          >
            {!isLoading &&
              Partner?.map((prod) => {
                return (
                  <div
                    style={{
                      width: "180px",
                      height: "230px",
                      background: "#fff",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      borderRadius: "10px",
                      overflow: "hidden",
                    }}
                  >
                    <img src={prod.image} alt="" className="imgCardPartner" />
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <div
                        className="textCard"
                        style={{
                          width: "100%",
                          textAlign: "center",
                          height: "60%",
                        }}
                      >
                        {prod.title}
                      </div>
                      <div
                        className=""
                        style={{
                          width: "100%",
                          height: "40%",
                          background: "#ffc700",
                          color: "#fff",
                          textAlign: "center",
                          fontWeight: "700",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          letterSpacing: "1px",
                        }}
                      >
                        Rp {prod.price.toLocaleString("en-ID")}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </Container>
    </>
  );
};

export default DetailProfilePartner;
