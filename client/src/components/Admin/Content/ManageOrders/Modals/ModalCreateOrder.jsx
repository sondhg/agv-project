import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import { toast } from "react-toastify";
import { postCreateNewOrder } from "../../../../../services/apiServices";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const NEW_DATE = new Date();
// console.log("🚀 ~ NEW_DATE:", NEW_DATE);
// console.log("🚀 ~ NEW_DATE date localized:", NEW_DATE.toLocaleDateString());

const ModalCreateOrder = (props) => {
  const { show, setShow } = props;

  const handleClose = () => {
    setShow(false);
    setVehicleId("1");
    setOriginalDate(NEW_DATE);
    setOrderDate(NEW_DATE.toLocaleDateString());
    setFromNode(1);
    setToNode(1);
    setLoadAmount(0);
    setLoadName("");
  };

  const [vehicle_id, setVehicleId] = useState("1");
  const [from_node, setFromNode] = useState(1);
  const [to_node, setToNode] = useState(1);
  const [load_name, setLoadName] = useState("");
  const [load_amount, setLoadAmount] = useState(0);
  const [originalDate, setOriginalDate] = useState(NEW_DATE);
  const [order_date, setOrderDate] = useState(NEW_DATE.toLocaleDateString());

  console.log("🚀 ~ ModalCreateOrder ~ order_date:", order_date);

  const handleSubmitCreateOrder = async () => {
    if (!load_name) {
      toast.warning("Adding a note is always recommended!");
    }

    if (load_amount < 0) {
      toast.warning("Load amount must not be negative!");
      return;
    }

    let data = await postCreateNewOrder(
      vehicle_id,
      order_date,
      from_node,
      to_node,
      load_amount,
      load_name
    );

    if (data) {
      toast.success("Order successfully added!");
      handleClose();
      await props.fetchListOrders();
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="xl"
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
              <label className="form-label">
                Date <i>(month/originalDate/year)</i>
              </label>
              <div>
                <DatePicker
                  className="form-select"
                  selected={originalDate}
                  minDate={NEW_DATE}
                  dateFormat="MM/dd/yyyy"
                  onChange={(date) => {
                    setOriginalDate(date);
                    // setOrderDate(date.toJSON()); // ! bị chậm theo giờ UTC
                    setOrderDate(date.toLocaleDateString()); // * đúng theo giờ local
                  }}
                />
              </div>
            </div>
            <div className="col-md-4">
              <label className="form-label">Start point</label>
              <select
                className="form-select"
                value={from_node}
                type="number"
                onChange={(event) => setFromNode(event.target.value)}
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
                value={to_node}
                type="number"
                onChange={(event) => setToNode(event.target.value)}
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label">Load name</label>
              <select
                className="form-select"
                value={load_name}
                type="number"
                onChange={(event) => setLoadName(event.target.value)}
              >
                <option value={"Stone"}>Stone</option>
                <option value={"Cement"}>Cement</option>
                <option value={"Steel"}>Steel</option>
                <option value={"Cotton"}>Cotton</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">
                Load amount <i>(kilograms)</i>
              </label>
              <input
                type="number"
                min="0"
                className="form-control"
                value={load_amount}
                onChange={(event) => setLoadAmount(event.target.value)}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose()}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSubmitCreateOrder()}>
            Send to draft
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalCreateOrder;
