import { Col, Container, Row } from "react-bootstrap";
import pizza from "../assets/waysfood/pizza.png";

function Jumbotron() {
  return (
    <>
      <Container fluid className="JumboPage p-5">
        <Row
          lg={9} md={6}
          className="align-items-center justify-content-center"
        >
          <Col lg={6} md={3} className="test">
            <h4 className="display-4 d-jumbo">Are You hungry ?</h4>
            <h4 className="display-4 d-jumbo">Express Home Delivery</h4>
            <Row lg={8}>
              <Col>
                <div>
                  <hr className="rectangle" />
                </div>
              </Col>
              <Col lg={5} className="fontLorem">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos
                eum ipsam officia non eaque dignissimos, natus numquam quaerat
                amet sit?
              </Col>
              <Col lg={2}></Col>
            </Row>
          </Col>
          <Col className="test d-flex justify-content-center" md={6} lg={3}>
            <img src={pizza} alt="" className="imgPizza" />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Jumbotron;
