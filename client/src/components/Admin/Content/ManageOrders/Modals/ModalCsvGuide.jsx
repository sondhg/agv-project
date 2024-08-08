import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Card from "react-bootstrap/Card";
import { FaFileImport } from "react-icons/fa";
import handleImportCSV from "../../../../../services/csvImportServices";

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
        <Alert variant="warning">
          Imported .csv file must have a <b>header row</b> containing the{" "}
          <b>exact variable names</b>, in the <b>exact order</b> from left to
          right, as shown in the <span style={{ color: "red" }}>example</span>{" "}
          below:
        </Alert>
        <Container className="m-4">
          <code>
            <Row>
              id,order_date,load_name,load_amount,start_time,from_node,to_node
            </Row>
            <Row>1,7/30/2024,Stone,4,16:30:00,1,3</Row>
            <Row>2,7/30/2024,Steel,4,16:35:00,2,4</Row>
          </code>
        </Container>
        <Alert variant="warning">
          <code>order_date</code> should be in format:{" "}
          <code>month/date/year</code> (<b>MM/dd/yyyy</b>)
        </Alert>
        <Alert variant="warning">
          <code>start_time</code> should be in 24-hour format, specifically:{" "}
          <code>hour:minute:second</code> (<b>HH:mm:ss</b>)
        </Alert>
        <Alert variant="success">
          Select file, then <b>refresh</b> the page to see results.
        </Alert>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => handleClose()}>
          Close
        </Button>
        <div className="p-2">
          <label htmlFor="import-csv" className="btn btn-success">
            <div style={{ display: "flex", alignItems: "center" }}>
              <FaFileImport size={20} />
              <span className="ms-2">Select file</span>
            </div>
          </label>
          <input
            id="import-csv"
            type="file"
            hidden
            onChange={(event) => {
              handleImportCSV(event);
            }}
          />
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalCsvGuide;
