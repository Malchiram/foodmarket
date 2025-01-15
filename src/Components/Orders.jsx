import { faMapLocation, faSquareMinus, faSquarePlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { distance } from "@turf/turf";
import { useContext, useEffect, useState } from "react";
import { Col, Container, Form, Modal, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { APILOC } from "../config/api";
import { useCustomMutation, useCustomQuery } from "../config/query";
import { UserContext } from "../utils/context/userContext";
import { deleteAllorder, deleteorder } from "../utils/product";
import { getOrder, postOrder } from "../utils/profile";
import { transaction } from "../utils/transaction";
import Map from "./Map";

const Orders = () => {
  const navigate = useNavigate(6)
  // fetch & post
  const order = useCustomMutation("try", postOrder)
  const pay = useCustomMutation("pay", transaction)
  const deleteid = useCustomMutation("deleteid", deleteorder)
  let { data, isLoading, refetch } = useCustomQuery("test", getOrder)

  // Map 
  const [showMap, setShowMap] = useState(false)
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const [state, _] = useContext(UserContext)

  const [selectedLocation, setSelectedLocation] = useState();
  const ongkir = 8000
  const getLocation = (lats, lngs) => {
    APILOC.get(`/reverse?format=json&lat=${lats}&lon=${lngs}`).then(
      (response) => {
        console.log(response, "ini response");
        setSelectedLocation(response?.data?.display_name);
      }
    );
  };

  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    setLat(lat);
    setLng(lng);
  };

  const handleMapButtonClick = () => {
    setShowMap(true);
  };

  const handleMapModalClose = () => {
    setShowMap(false);
  };

  // calculate
  const calculateDistance = (startLng, startLat, endLng, endLat) => {
    const startPoint = ([startLng, startLat])
    const endPoint = ([endLng, endLat])
    const option = { units: 'kilometers' };
    const dist = distance(startPoint, endPoint, option)
    return dist
  }


  const latUser = state?.user.lat
  const lngUser = state?.user.lng
  const partnerLocLng = data[0]?.seller?.location?.split(",")[1]
  const partnerLocLat = data[0]?.seller?.location?.split(",")[0]
  useEffect(() => {
    if (lat && lng) {
      getLocation(lat, lng);
      // console.log("engga ini yg terender");
    } else if (latUser && lngUser) {
      getLocation(
        parseFloat(latUser),
        parseFloat(lngUser)
      );
      // console.log("ini terrednder");
    }
  }, [lat, lng, state?.user]);

  const loc = `${lat}, ${lng}`;




  const total = data?.map((tot) => {
    return tot.qty * tot.product.price
  })
  const subTotal = total.reduce((acc, curr) => acc + curr, 0
  )

  const totalQty = data.map((quantity) => {
    return quantity.qty
  })
  const subQty = totalQty.reduce((acc, curr) => acc + curr, 0
  )

  const calculatedDistance = calculateDistance(partnerLocLng, partnerLocLat, lngUser, latUser)
  const distances = calculatedDistance.toFixed(2)
  let totalOngkir = ongkir * distances
  let result = subTotal + totalOngkir

  const handleWaitingApprove = async (e) => {
    try {
      e.preventDefault();
      const transaction = {
        buyerid: data[0]?.buyer?.id,
        sellerid: data[0]?.seller?.id,
        totalPrice: Number(subTotal)
      };

      const body = JSON.stringify(transaction);
      const response = await pay.mutateAsync(body, {
        onSuccess: () => {
          deleteAllorder()
          refetch()
          navigate("/Profile")
        }
      });

      console.log(response, "cek response");
      if (response) {
        const token = response?.token;
        window.snap.pay(token, {
          onSuccess: function (result) {
            /* You may add your own implementation here */
            console.log(result);
            navigate("/Profile");
          },
          onPending: function (result) {
            /* You may add your own implementation here */
            console.log(result);
            navigate("/Profile");
          },
          onError: function (result) {
            /* You may add your own implementation here */
            console.log(result);
            navigate("/Profile");
          },
          onClose: function () {
            /* You may add your own implementation here */
            alert("you closed the popup without finishing the payment");
          },
        });
      }


    } catch (error) {
      console.log("transaction failed : ", error);
    }
  };

  useEffect(() => {
    //change this to the script source you want to load, for example this is snap.js sandbox env
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    //change this according to your client-key
    const myMidtransClientKey = process.env.REACT_APP_MIDTRANS_CLIENT_KEY;

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    // optional if you want to set script attribute
    // for example snap.js have data-client-key attribute
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);
  return (
    <>
      <Modal size="xl" show={showMap} onHide={handleMapModalClose}>
        <Modal.Body>
          <Map
            selectedLat={lat}
            selectedLng={lng}
            handleMapClick={(e) => handleMapClick(e)}
          />
        </Modal.Body>
      </Modal>
      <Container style={{ marginTop: "60px" }}>
        <div>
          <h3>{!isLoading && data ? data[0]?.seller?.fullname : "cinta"}</h3>
        </div>


        <Form.Label>Delivery Location</Form.Label>
        <Form.Group className="d-flex justify-content-between mt-3" controlId="exampleForm.ControlInput1">
          <Form.Control
            type="text"
            name="location"
            placeholder="Location"
            defaultValue={selectedLocation}
            style={{ width: "75%", backgroundColor: "#fff", border: "1px solid #766C6C", height: "50px" }}
          />
          <div className="MapButton">
            <button type="button"
              onClick={handleMapButtonClick}
            >
              Select On Map <FontAwesomeIcon icon={faMapLocation} />
            </button>
          </div>
        </Form.Group>

        <h2 className="mt-5">Review Your Order</h2>

        <Row>
          <Col lg={9}>
            <div className=" mt-3">
              {!isLoading && data.sort((a, b) => a.id - b.id).map((item) => {
                return (

                  <div className="d-flex justify-content-between" style={{ borderTop: "1px solid #000", borderBottom: "1px solid #000" }}>
                    <div className="d-flex">
                      <img src={item.product.image} alt="" className="imgTransaction" />
                      <div>

                        <p className="textTransaction">{item.product.title}</p>
                        <h4>
                          <span
                            className="me-3"
                            style={{
                              color: "#FFAF00",
                              borderRadius: "10px",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              if (item.qty > 1) {

                                let datas = {
                                  qty: item?.qty - 1,
                                  buyer_Id: item?.buyer.id,
                                  seller_Id: item?.seller.id,
                                  product_Id: item?.product_id
                                }
                                order.mutate(datas, {
                                  onSuccess: () => {
                                    refetch()
                                  }
                                })
                              }
                            }}
                          >
                            <FontAwesomeIcon icon={faSquareMinus} />
                          </span>
                          {item?.qty}
                          <span
                            className="ms-3"
                            style={{
                              color: "#FFAF00",
                              borderRadius: "10px",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              let datas = {
                                qty: item.qty + 1,
                                buyer_Id: item?.buyer_id,
                                seller_Id: item?.seller_id,
                                product_Id: item?.product_id
                              }
                              order.mutate(datas, {
                                onSuccess: () => {
                                  refetch()
                                }
                              })

                            }}
                          >
                            <FontAwesomeIcon icon={faSquarePlus} />
                          </span>
                        </h4>
                      </div>
                    </div>
                    <Row className="textTransaction me-3">
                      <Col>Rp</Col>
                      <Col>{item.product.price}</Col>
                      <div className="bin" onClick={() => {
                        Swal.fire({
                          title: "Are you sure want to delete this Order?",
                          text: "You won't be able to revert this!",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "Yes, delete it!",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            deleteid.mutate(item.id, {
                              onSuccess: () => {
                                refetch()
                              }
                            })
                          }
                        })
                      }}>
                        <FontAwesomeIcon icon={faTrashCan} />
                      </div>
                    </Row>
                  </div>
                )
              })}
            </div >
          </Col>

          <Col lg={3} className="mt-3" >
            <Row style={{ borderTop: "1px solid #000", padding: "20px 0" }}>
              <Col lg={8}>Sub Total</Col>
              <Col >Rp {subTotal.toLocaleString("en-ID")} </Col>
              <Row >
                <Col lg={8}>Quantity</Col>
                <Col style={{ textAlign: "end" }}>{subQty}</Col>
              </Row>
              <Row >
                <Col lg={8}>Distance</Col>
                <Col style={{ textAlign: "end" }}>{distances} Km</Col>
              </Row>
              <Row >
                <Col lg={8}>Ongkir</Col>
                <Col style={{ textAlign: "end" }} >{totalOngkir.toLocaleString("en-ID")}</Col>
              </Row>
            </Row>
            <Row style={{ borderTop: "1px solid #000", padding: "20px 0" }}>
              <Col lg={8}>Total</Col>
              <Col style={{ textAlign: "end" }}>Rp {result.toLocaleString("en-ID")}</Col>
            </Row>
          </Col>
        </Row>

        <div className="transactionButton">
          <button type="button"
            onClick={(e) => handleWaitingApprove(e)}
          >
            ORDER
          </button>
        </div>
      </Container>
    </>
  );
};

export default Orders;
