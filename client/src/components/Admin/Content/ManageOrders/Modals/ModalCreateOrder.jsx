import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import { toast } from "react-toastify";
import { postCreateNewOrder } from "../../../../../services/apiServices";

const ModalCreateOrder = (props) => {
  const { show, setShow } = props;

  const handleClose = () => {
    setShow(false);
    setVehicleCode("McLaren");
    setStartPoint("A");
    setEndPoint("A");
    setQuickNote("");
  };

  const [vehicleCode, setVehicleCode] = useState("McLaren");
  const [startPoint, setStartPoint] = useState("A");
  const [endPoint, setEndPoint] = useState("A");
  const [quickNote, setQuickNote] = useState("");

  const handleSubmitCreateOrder = async () => {
    //validate: mai làm sau

    if (!quickNote) {
      toast.warning("Adding a note is always recommended!");
    }

    let data = await postCreateNewOrder(
      vehicleCode,
      startPoint,
      endPoint,
      quickNote
    );

    if (data) {
      //chưa có validate

      toast.success("Order successfully added!");
      handleClose();
      await props.fetchListOrders();
    }
  };

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal
        show={show}
        onHide={handleClose}
        size="xl"
        backdrop="static" //khi bấm Esc hoặc click chuột bên ngoài thì modal ko tắt
        className="modal-add-order"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add new order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-4">
              <label className="form-label">Vehicle code</label>
              <select
                className="form-select"
                value={vehicleCode}
                onChange={(event) => setVehicleCode(event.target.value)}
              >
                <option value="McLaren">McLaren</option>
                <option value="Pagani">Pagani</option>
                <option value="Bentley">Bentley</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label">Start point</label>
              <select
                className="form-select"
                value={startPoint}
                onChange={(event) => setStartPoint(event.target.value)}
              >
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label">End point</label>
              <select
                className="form-select"
                value={endPoint}
                onChange={(event) => setEndPoint(event.target.value)}
              >
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Quick note</label>
              <input
                type="text"
                className="form-control"
                value={quickNote}
                onChange={(event) => setQuickNote(event.target.value)}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmitCreateOrder}>
            Send to draft
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalCreateOrder;
