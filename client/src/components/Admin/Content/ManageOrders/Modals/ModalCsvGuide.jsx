import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Card from "react-bootstrap/Card";

const ModalCsvGuide = (props) => {
  const { show, setShow } = props;

  const handleClose = () => {
    setShow(false);
  };

  return (
    <Modal show={show} onHide={() => handleClose()} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>Correct CSV file format</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Imported CSV file must have a <b>header row</b> containing the{" "}
          <b>exact variable names</b>, in the <b>exact order</b> from left to
          right, as shown in the <span style={{ color: "red" }}>example</span>{" "}
          below:
        </p>
        <Container>
          <Row>
            id,order_date,load_name,load_amount,start_time,from_node,to_node
          </Row>
          <Row>1,7/30/2024,Stone,4,16:30:00,1,3</Row>
          <Row>2,7/30/2024,Steel,4,16:35:00,2,4</Row>
        </Container>
      </Modal.Body>

      <Modal.Footer>
        <p>order_date should be in format month/date/year (MM/dd/yyyy)</p>
        <Button variant="secondary" onClick={() => handleClose()}>
          Understood
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalCsvGuide;
