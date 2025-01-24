import { distance } from "@turf/turf";
import { useContext } from "react";
import { Container } from "react-bootstrap";
import { UserContext } from "../utils/context/userContext";
import { useSelector } from "react-redux";
const Recommended = ({ data, load }) => {
  const calculateDistance = (startLng, startLat, endLng, endLat) => {
    const startPoint = [startLng, startLat];
    const endPoint = [endLng, endLat];
    const option = { units: "kilometers" };
    const dist = distance(startPoint, endPoint, option);
    return dist;
  };
  const { isLogin,role,user } = useSelector((state) => state?.user);


    return (
    <>
      <Container className=" homePopular">
        <h3>Restaurant Near You</h3>

        <div className="d-flex" style={{flexWrap:'wrap',gap:'5px'}}>
          {!load &&
            data?.slice(0, 4).map((item, i) => {
              const handleClick = () => {
                window.location.href = `/Product/${item.id}`;
              };
              return (
                <div key={i} onClick={handleClick}>
                  <div className="recommended shadow-lg">
                    <img src={item?.image} alt="" className="imageRes" />
                    <p className="textRes">{item?.fullname}</p>
                    <p className="textDistance">
                      {isLogin && role !== "As Partner"
                        ? calculateDistance(
                            item?.lng,
                            item?.lat,
                            user?.lng,
                            user?.lat
                          ).toFixed(2)
                        : 0}
                      KM
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
      </Container>
    </>
  );
};

export default Recommended;
