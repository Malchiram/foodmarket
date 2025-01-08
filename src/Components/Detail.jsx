import { useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useCustomMutation, useCustomQuery } from "../config/query";
import { UserContext } from "../utils/context/userContext";
import { getProductId } from "../utils/product";
import { getOrder, postOrder } from "../utils/profile";

const Detail = () => {
  const { id } = useParams();

  const [state] = useContext(UserContext)

  let { data: Partner, isLoading } = useCustomQuery(["data", id], () =>
    getProductId(id),
  );

  let result = useCustomQuery("test", getOrder)
  const order = useCustomMutation("try", postOrder)

  const handleOrder = (prod) => {
    let datas = {
      qty: 1,
      buyer_Id: state.user.id,
      seller_Id: prod.user.id,
      product_Id: prod.id,
    };
    order.mutate(datas, {
      onSuccess: () => {
        result.refetch()
      },
    });
  };


  return (
    <Container className="containerCard">
      <h3>{!isLoading && Partner[0]?.user?.fullname}</h3>
      <Row >
        {!isLoading && Partner.map((prod) => {
          return (

            <div className="cardPartner">

              <Col className="padCard">
                <img src={prod.image} alt="" className="imgCardPartner" />
                <p className="textCard">{prod.title}</p>
                <p className="priceCard">Rp {prod.price.toLocaleString("en-ID")}</p>
                <button onClick={() => handleOrder(prod)}>Order</button>
              </Col>
            </div>


          )
        })}

      </Row>
    </Container>
  );
};

export default Detail;
