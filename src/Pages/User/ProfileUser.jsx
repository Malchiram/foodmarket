import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Icon from "../../assets/waysfood/Icon.svg";
import Profile from "../../assets/waysfood/profile.png";
import { useContext } from "react";
import { UserContext } from "../../utils/context/userContext";
import { useCustomQuery } from "../../config/query";
import { transactionUser } from "../../utils/transaction";
const DetailProfilePartner = () => {
  const navigate = useNavigate()
  const handleButtonProfile = () => {
    navigate("/EditProfile")
  }
  const dateConvert = (params) => {
    var params = new Date();
    var options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    var formattedDate = params.toLocaleDateString("en-US", options);
    return formattedDate;
  };

  const [state] = useContext(UserContext)
  let { data, isLoading } = useCustomQuery("transaction", transactionUser)



  return (
    <>
      <Container className="ProfileUser">
        <Row >
          <Col className="textProfile" >Profile</Col>
          <Col className="textProfile" >History Transaction</Col>
        </Row>
        <Row className="divProfile">

          <Col >
            <Row >
              <Col md={4}>
                <img src={state.user.image} alt="" className="imageProfile" />
              </Col>
              <Col md={4} className="detailProfile">
                <div>
                  <h5>Name</h5>
                  <p>{state.user.fullname}</p>
                </div>
                <div>
                  <h5>Email</h5>
                  <p>{state.user.email}</p>
                </div>
                <div>
                  <h5>Phone</h5>
                  <p>{state.user.phone}</p>
                </div>
              </Col>
            </Row>
            <Col md={12} >
              <button onClick={handleButtonProfile}>Edit Profile</button>
            </Col>
          </Col>
          <Col >


            {!isLoading && data?.length > 0 ? (
              data.map((item, idx) => {
                return (
                  <>
                    <Row className="cardHistory">
                      <Col md={7} key={idx} >
                        <p className="pName" style={{ marginBottom: "4px" }}>{item?.seller?.fullname}</p>
                        <p className="pDate" style={{ marginBottom: "14px" }}><span>{dateConvert("2023-15-06")}</span></p>
                        <p className="pTotal">Total : Rp {item?.total_price.toLocaleString("en-ID")} </p>
                      </Col>
                      <Col md={5}>
                        <img src={Icon} alt="" />
                        <div className="historyStatus">
                          <p>{item?.status}</p>
                        </div>
                      </Col>
                    </Row>
                  </>
                )
              })
            ) : (
              <>
                <h1>No order ....</h1>
              </>
            )
            }

          </Col>
        </Row>

      </Container>
    </>
  );
};

export default DetailProfilePartner
  ;
