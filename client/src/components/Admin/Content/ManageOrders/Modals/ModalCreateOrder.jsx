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
    setVehicleId("1");
    setPreviousNode(1);
    setNextNode(1);
    setLoadAmount(0);
    setQuickNote("");
  };

  const [vehicle_id, setVehicleId] = useState("1");
  const [previous_node, setPreviousNode] = useState(1);
  const [next_node, setNextNode] = useState(1);
  const [quick_note, setQuickNote] = useState("");
  const [load_amount, setLoadAmount] = useState(0);

  const handleSubmitCreateOrder = async () => {
    //validate: mai làm sau

    if (!quick_note) {
      toast.warning("Adding a note is always recommended!");
    }

    if (load_amount < 0) {
      toast.warning("Load amount must not be negative!");
      return;
    }

    let data = await postCreateNewOrder(
      vehicle_id,
      previous_node,
      next_node,
      load_amount,
      quick_note
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
                value={vehicle_id}
                onChange={(event) => setVehicleId(event.target.value)}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label">Start point</label>
              <select
                className="form-select"
                value={previous_node}
                type="number"
                onChange={(event) => setPreviousNode(event.target.value)}
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label">End point</label>
              <select
                className="form-select"
                value={next_node}
                type="number"
                onChange={(event) => setNextNode(event.target.value)}
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Load amount (kilograms)</label>
              <input
                type="number"
                className="form-control"
                value={load_amount}
                onChange={(event) => setLoadAmount(event.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Quick note</label>
              <input
                type="text"
                className="form-control"
                value={quick_note}
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
