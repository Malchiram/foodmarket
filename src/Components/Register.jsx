import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useCustomMutation } from "../config/query";


import Swal from "sweetalert2";
import { register } from "../utils/auth";

function Register({ showReg, handleClose }) {
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
    gender: "Male",
    phone: "",
    role: "As User",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const registerMutation = useCustomMutation("register", register);

  const handleSubmit = async (e) => {
    e.preventDefault();
    registerMutation.mutate(form);

    handleClose();
  };

  return (
    <Modal show={showReg} onHide={() => handleClose()}>
      <Modal.Title className="RegisterLog">Register</Modal.Title>

      <Modal.Body className="bodyRegLog">
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Group className="formGroup">
            <Form.Control
              type="email"
              name="email"
              autoFocus
              required
              placeholder="Email"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="formGroup">
            <Form.Control
              type="password"
              name="password"
              required
              placeholder="Password"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="formGroup">
            <Form.Control
              type="text"
              name="fullname"
              required
              placeholder="Full Name"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="formGroup">
            <Form.Select name="gender" required onChange={handleChange}>
              <option>Male</option>
              <option>Female</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="formGroup">
            <Form.Control
              type="text"
              name="phone"
              required
              placeholder="Phone"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Select name="role" required onChange={handleChange}>
              <option>As User</option>
              <option>As Partner</option>
            </Form.Select>
          </Form.Group>
          <div className="buttonRegisterLog">
            <Button type="submit">Register</Button>
          </div>
        </Form>
      </Modal.Body>

      <p className="text-center blurText">
        Already have an account? Click <span>Here</span>
      </p>
    </Modal>
  );
}

export default Register;
