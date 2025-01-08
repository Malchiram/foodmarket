import { useState } from "react";
import { Form, InputGroup, Button, Container } from "react-bootstrap";

const Buttons = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
    onSearch(searchTerm);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (searchTerm === "") {
        handleSearch();
      }
    }
  };
  console.log(searchTerm, "ini pencariannya");

  return (
    <Container className="buttonSearch">
      <InputGroup style={{ width: "96%", marginLeft: "20px", height: "45px" }}>
        <Form.Control
          placeholder="Find Your Trip here"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />

        <Button
          style={{
            width: "160px",
            backgroundColor: "#ffaf00",
            border: "none",
            fontWeight: "700",
          }}
          onClick={handleSearch}
        >
          Button
        </Button>
      </InputGroup>
    </Container>
  );
};

export default Buttons;
