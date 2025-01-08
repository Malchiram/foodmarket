import { LoadScript, StandaloneSearchBox } from "@react-google-maps/api";
import { useContext, useRef, useState } from "react";
import { Container, Form } from "react-bootstrap";
import { useCustomMutation } from "../../config/query";
import { UserContext } from "../../utils/context/userContext";
import { editProfile } from "../../utils/profile";
const EditProfile = () => {
  const [state, _] = useContext(UserContext);

  const [userUpdateData, setUserUpdateData] = useState({
    fullname: state.user.fullname,
    email: state.user.email,
    address: state.user.address,
    phone: state.user.phone,
    shortname: state.user.shortname,
    image: state.user.image ?? null,
    lat: state.user.lat,
    lng: state.user.lng,
  });
  console.log(state);
  const postForm = useCustomMutation("patch", editProfile);

  const handleInputChange = (e) => {
    setUserUpdateData({
      ...userUpdateData,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });
  };
  const updateUser = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("fullname", userUpdateData.fullname);
    formData.set("email", userUpdateData.email);
    formData.set("phone", userUpdateData.phone);
    formData.set("shortname", userUpdateData.shortname);
    if (userUpdateData?.image[0]?.name) {
      formData.set(
        "image",
        userUpdateData?.image[0],
        userUpdateData?.image[0].name
      );
    } else {
    }
    formData.set("address", userUpdateData.address);
    formData.set("lat", userUpdateData.lat);
    formData.set("lng", userUpdateData.lng);
    postForm.mutate(formData);
  };
  const inputRef = useRef(null);

  const handlePlaceChanged = () => {
    const [place] = inputRef.current.getPlaces();
    if (place) {
      setUserUpdateData({
        ...userUpdateData,
        address: place.formatted_address,
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
    }
  };
  return (
    <>
      <Container style={{ margin: "80px auto" }}>
        <h4 className="addProduct">
          {state?.user?.role === "As User"
            ? "Edit Profile"
            : "Edit Profile Partner"}
        </h4>

        <Form onSubmit={(e) => updateUser(e)}>
          <Form.Group
            className="d-flex justify-content-between"
            controlId="exampleForm.ControlInput1"
          >
            <Form.Control
              type="text"
              name="fullname"
              value={userUpdateData.fullname}
              onChange={handleInputChange}
              placeholder={
                state?.user?.role === "As User" ? "Name User" : "Name Partner"
              }
              style={{
                width: "69%",
                backgroundColor: "#D2D2D240",
                border: "2px solid #766C6C",
                height: "50px",
              }}
            />
            <Form.Control
              type="file"
              style={{
                width: "30%",
                backgroundColor: "#D2D2D240",
                border: "2px solid #766C6C",
                height: "50px",
              }}
              name="image"
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mt-3" controlId="exampleForm.ControlInput1">
            <Form.Control
              type="email"
              name="email"
              value={userUpdateData.email}
              onChange={handleInputChange}
              placeholder="Email"
              style={{
                backgroundColor: "#D2D2D240",
                border: "2px solid #766C6C",
                height: "50px",
              }}
            />
          </Form.Group>
          <Form.Group className="mt-3" controlId="exampleForm.ControlInput1">
            <Form.Control
              type="text"
              name="phone"
              value={userUpdateData.phone}
              onChange={handleInputChange}
              placeholder="Phone"
              style={{
                backgroundColor: "#D2D2D240",
                border: "2px solid #766C6C",
                height: "50px",
              }}
            />
          </Form.Group>
          {state.user.role === "As Partner" && (

          <Form.Group className="mt-3" controlId="exampleForm.ControlInput1">
            <Form.Control
              type="text"
              name="shortname"
              maxLength={5}
              value={userUpdateData.shortname}
              onChange={handleInputChange}
              placeholder="Shortname"
              style={{
                backgroundColor: "#D2D2D240",
                border: "2px solid #766C6C",
                height: "50px",
              }}
            />
          </Form.Group>
          )}

          <Form.Group className=" mt-3" controlId="exampleForm.ControlInput1">
            <LoadScript
              googleMapsApiKey={process.env.REACT_APP_AUTOCOMPLETE}
              libraries={["places"]}
            >
              <StandaloneSearchBox
                onLoad={(ref) => (inputRef.current = ref)}
                onPlacesChanged={handlePlaceChanged}
              >
                <Form.Control
                  type="text"
                  name="address"
                  value={userUpdateData.address}
                  onChange={handleInputChange}
                  placeholder="Address"
                  style={{
                    width: "100%",
                    backgroundColor: "#D2D2D240",
                    border: "2px solid #766C6C",
                    height: "50px",
                  }}
                />
              </StandaloneSearchBox>
            </LoadScript>
          </Form.Group>

          <div className="buttonAddProduct mt-5">
            <button type="submit">Save</button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default EditProfile;
