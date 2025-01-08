import { useState } from "react";
import { Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import Swal from "sweetalert2";
import { useCustomMutation, useCustomQuery } from "../../config/query";
import { addProduct } from "../../utils/admin";
const AddProductInput = () => {
  const navigate = useNavigate();
  const [productData, setProductData] = useState({
    title: "",
    price: "",
    image: null,
  });

  const postForm = useCustomMutation("post", addProduct);

  const handleInputChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });
  };

  const submitAddProduct = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.set("title", productData.title);
      formData.set("price", Number(productData.price));
      formData.set("image", productData.image[0], productData.image[0].name);
      const result = await postForm.mutate(formData);
      console.log(result, "ini result dari post");
      // navigate("/admin");
    } catch (error) {
      throw new Error("Failed to posted data product ");
    }



  };

  return (
    <>
      <Container style={{ margin: "80px auto" }}>
        <h4
          className="addProduct"
        >
          Add Product
        </h4>

        <Form onSubmit={(e) => submitAddProduct(e)}>
          <Form.Group className="d-flex justify-content-between" controlId="exampleForm.ControlInput1">

            <Form.Control
              type="text"
              name="title"
              value={addProduct.title}
              onChange={handleInputChange}
              placeholder="Title"
              style={{ width: "69%", backgroundColor: "#D2D2D240", border: "2px solid #766C6C", height: "50px" }}
            />
            <Form.Control
              type="file"
              style={{ width: "30%", backgroundColor: "#D2D2D240", border: "2px solid #766C6C", height: "50px" }}
              name="image"
              onChange={handleInputChange}
            />
          </Form.Group>





          <Form.Group className="mt-3" controlId="exampleForm.ControlInput1">

            <Form.Control
              type="text"
              name="price"
              value={addProduct.price}
              onChange={handleInputChange}
              placeholder="Price"
              style={{ backgroundColor: "#D2D2D240", border: "2px solid #766C6C", height: "50px" }}
            />
          </Form.Group>

          <div className="buttonAddProduct">
            <button
              type="submit"
            >
              Save
            </button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default AddProductInput;
