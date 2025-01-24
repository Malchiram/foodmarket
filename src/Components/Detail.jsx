import { useCallback, useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useCustomMutation, useCustomQuery } from "../config/query";
import { getProductId } from "../utils/product";
import { getOrder, postOrder } from "../utils/profile";
import { useDispatch, useSelector } from "react-redux";
import { setOrderLength } from "../utils/action/orderAction";

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { isLogin,role,user } = useSelector((state) => state?.user);


  let { data: Partner, isLoading, } = useCustomQuery(["data", id], () =>
    getProductId(id),
  );

   const getOrderMemoized = useCallback(() => getOrder(isLogin && user.role === "As User"), []);
    let {  refetch } = useCustomQuery("test", getOrderMemoized, {
      staleTime: 300000, // Data dianggap fresh selama 5 menit
      cacheTime: 600000 // Cache data selama 10 menit
    })
  const order = useCustomMutation("try", postOrder)

  const handleOrder = async (prod) => {
    try {
      let datas = {
        qty: 1,
        buyer_Id: user.id,
        seller_Id: prod.user.id,
        product_Id: prod.id,
      };
      await order.mutateAsync(datas,{onSuccess: async () => {
        const updatedData = await refetch();
        dispatch(setOrderLength(updatedData.data.length));
      }
    });
    
    } catch (error) {
      console.log(error)
    }
    
    
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
