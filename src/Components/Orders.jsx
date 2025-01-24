import {
  faMapLocation,
  faSquareMinus,
  faSquarePlus,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { distance } from "@turf/turf";
import {  useEffect, useMemo, useState } from "react";
import { Col, Container, Form, Modal, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { APILOC } from "../config/api";
import { useCustomMutation, useCustomQuery } from "../config/query";
import { deleteAllorder, deleteorder } from "../utils/product";
import { getOrder, postOrder } from "../utils/profile";
import { transaction } from "../utils/transaction";
import Map from "./Map";
import { useDispatch, useSelector } from "react-redux";
import { setOrderLength } from "../utils/action/orderAction";

export const PriceList = ({ title, price }) => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div>{title}</div>
      <div>{price}</div>
    </div>
  );
};

const Orders = () => {
  const navigate = useNavigate();
  // fetch & post
  const dispatch = useDispatch();

  const order = useCustomMutation("try", postOrder);
  const pay = useCustomMutation("pay", transaction);
  const deleteid = useCustomMutation("deleteid", deleteorder);
  const { isLogin,role,user } = useSelector((state) => state?.user);


  let { data, isLoading, refetch } = useCustomQuery("test", getOrder);
  const [dataOrder, setDataOrder] = useState(data);

  // Map
  const [showMap, setShowMap] = useState(false);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);

  const [selectedLocation, setSelectedLocation] = useState();
  const ongkir = 8000;
  const getLocation = (lats, lngs) => {
    APILOC.get(`/reverse?format=json&lat=${lats}&lon=${lngs}`).then(
      (response) => {
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
    const startPoint = [startLng, startLat];
    const endPoint = [endLng, endLat];
    const option = { units: "kilometers" };
    const dist = distance(startPoint, endPoint, option);
    return dist;
  };

  const dataDistance = useMemo(() => {
    if (!isLoading) {
      const latUser = user?.lat;
      const lngUser = user?.lng;

      const partnerLocLat = data[0]?.seller?.lng ?? 0
      const partnerLocLng = data[0]?.seller?.lat ?? 0
      return {
        latUser,
        lngUser,
        partnerLocLat,
        partnerLocLng,
      };
    }
  }, [data, user ,isLoading]);
  

  useEffect(() => {
    if (lat !== null && lng !== null) {
      getLocation(lat, lng);
    } else {
      getLocation(dataDistance?.latUser, dataDistance?.lngUser);
    }
  }, [lat, lng, user]);

  const dataTotal = useMemo(() => {
    const total = data?.map((tot) => {
      return tot.qty * tot.product.price;
    });

    const subTotal = total?.reduce((acc, curr) => acc + curr, 0);

    const totalQty = data?.map((quantity) => {
      return quantity.qty;
    });
    const subQty = totalQty?.reduce((acc, curr) => acc + curr, 0);

    const calculatedDistance = calculateDistance(
      dataDistance?.partnerLocLng,
      dataDistance?.partnerLocLat,
      dataDistance?.lngUser,
      dataDistance?.latUser
    );
    const distances = calculatedDistance?.toFixed(2);
    let totalOngkir = ongkir * distances;
    let result = subTotal + totalOngkir;
    return [
      {
        Title: "SubTotal",
        Price: `Rp ${subTotal?.toLocaleString("en-ID")}`,
      },
      {
        Title: "Quantity",
        Price: subQty,
      },
      {
        Title: "Sub Quantity",
        Price: subTotal,
      },
      {
        Title: "Distance",
        Price: subTotal,
      },
      {
        Title: "Ongkir",
        Price: `${distances} Km`,
      },
      {
        Title: "Total",
        Price: `Rp ${result?.toLocaleString("en-ID")}`,
      },
    ];
  }, [dataDistance, data]);

  const handleWaitingApprove = async (e) => {
    try {
      e.preventDefault();
      const transaction = {
        buyerid: data[0]?.buyer?.id,
        sellerid: data[0]?.seller?.id,
        // totalPrice: Number(subTotal),
      };

      const body = JSON.stringify(transaction);
      const response = await pay.mutateAsync(body, {
        onSuccess: () => {
          deleteAllorder();
          refetch();
          navigate("/Profile");
        },
      });

      if (response) {
        const token = response?.token;
        window.snap.pay(token, {
          onSuccess: function (result) {
            /* You may add your own implementation here */
            navigate("/Profile");
          },
          onPending: function (result) {
            /* You may add your own implementation here */
            navigate("/Profile");
          },
          onError: function (result) {
            /* You may add your own implementation here */
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
    if (!isLoading) {
      setDataOrder(data);
    }
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
  console.log(dataOrder);

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
        <Form.Group
          className="d-flex justify-content-between mt-3"
          controlId="exampleForm.ControlInput1"
        >
          <Form.Control
            type="text"
            name="location"
            placeholder="Location"
            defaultValue={selectedLocation}
            style={{
              width: "75%",
              backgroundColor: "#fff",
              border: "1px solid #766C6C",
              height: "50px",
            }}
          />
          <div className="MapButton">
            <button type="button" onClick={handleMapButtonClick}>
              Select On Map <FontAwesomeIcon icon={faMapLocation} />
            </button>
          </div>
        </Form.Group>

        <h2 className="mt-5">Review Your Order</h2>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            style={{
              width: "73%",
            }}
          >
            {!isLoading &&
              dataOrder
                ?.sort((a, b) => a.id - b.id)
                .map((item, i) => {
                  return (
                    <div
                      key={i}
                      className="d-flex justify-content-between"
                      style={{
                        borderTop: "1px solid #000",
                        borderBottom: "1px solid #000",
                        height: "8rem",
                      }}
                    >
                      <div className="d-flex">
                        <img
                          src={item?.product?.image}
                          alt=""
                          className="imgTransaction"
                        />
                        <div>
                          <p className="textTransaction">
                            {item?.product?.title}
                          </p>
                          <h4>
                            <span
                              className="me-3"
                              style={{
                                color: "#FFAF00",
                                borderRadius: "10px",
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                if (item?.qty > 1) {
                                  let datas = {
                                    qty: item?.qty - 1,
                                    buyer_Id: item?.buyer.id,
                                    seller_Id: item?.seller.id,
                                    product_Id: item?.product_id,
                                  };
                                  order.mutateAsync(datas, {
                                    onSuccess: async () => {
                                      const updatedData = await refetch();
                                      setDataOrder(updatedData?.data);
                                    },
                                  });
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
                                  qty: item?.qty + 1,
                                  buyer_Id: item?.buyer_id,
                                  seller_Id: item?.seller_id,
                                  product_Id: item?.product_id,
                                };
                                order.mutateAsync(datas, {
                                  onSuccess: async () => {
                                    const updatedData = await refetch();
                                    setDataOrder(updatedData?.data);
                                  },
                                });
                              }}
                            >
                              <FontAwesomeIcon icon={faSquarePlus} />
                            </span>
                          </h4>
                        </div>
                      </div>
                      <div
                        className="textTransaction "
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          border: "solid 1px",
                          height: "100%",
                          width: "20%",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <div className="d-flex ">
                          {/* <div>Rp</div> */}
                          <div>
                            Rp {item?.product?.price?.toLocaleString("en-ID")}
                          </div>
                        </div>
                        <div
                          className="bin"
                          onClick={() => {
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
                                deleteid.mutateAsync(item?.id, {
                                  onSuccess: async () => {
                                    const updateData = await refetch();
                                    dispatch(
                                      setOrderLength(updateData?.data?.length)
                                    );
                                    if (updateData?.data?.length < 1) {
                                      navigate("/");
                                    }
                                  },
                                });
                              }
                            });
                          }}
                        >
                          <FontAwesomeIcon icon={faTrashCan} />
                        </div>
                      </div>
                    </div>
                  );
                })}
          </div>

          <div
            style={{
              width: "25%",
            }}
          >
            <div
              style={{
                padding: "9px 0",
                width: "100%",
                borderTop: "1px solid #000",
              }}
            >
              {dataTotal
                .filter(
                  (e) => e.Title !== "Total" && e.Title !== "Sub Quantity"
                )
                .map((e, i) => (
                  <PriceList key={i} title={e.Title} price={e.Price} />
                ))}
            </div>
            <div
              style={{
                padding: "9px 0",
                width: "100%",
                borderTop: "1px solid #000",
              }}
            >
              {dataTotal
                .filter(
                  (e) => e.Title === "Total" && e.Title !== "Sub Quantity"
                )
                .map((e, i) => (
                  <PriceList key={i} title={e.Title} price={e.Price} />
                ))}
            </div>
          </div>
        </div>

        <div className="transactionButton">
          <button type="button" onClick={(e) => handleWaitingApprove(e)}>
            ORDER
          </button>
        </div>
      </Container>
    </>
  );
};

export default Orders;
