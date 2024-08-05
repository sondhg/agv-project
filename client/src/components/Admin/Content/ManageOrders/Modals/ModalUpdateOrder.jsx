import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { putUpdateOrder } from "../../../../../services/apiServices";
import _ from "lodash";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const NEW_DATE = new Date();

const ModalUpdateOrder = (props) => {
  const { show, setShow, dataUpdate } = props;
  //ko cần dùng props.dataUpdate ở phần code sau nữa, chỉ cần dùng biến dataUpdate

  const handleClose = () => {
    setShow(false);
    setVehicleId("1");
    setOriginalDate(NEW_DATE);
    setOrderDate(NEW_DATE.toLocaleDateString());
    setFromNode(1);
    setToNode(1);
    setLoadAmount(0);
    setLoadName("");
    props.resetUpdateData();
  };

  const [vehicle_id, setVehicleId] = useState("1");
  const [from_node, setFromNode] = useState(1);
  const [to_node, setToNode] = useState(1);
  const [load_name, setLoadName] = useState("");
  const [load_amount, setLoadAmount] = useState(0);
  const [originalDate, setOriginalDate] = useState(NEW_DATE);
  const [order_date, setOrderDate] = useState(NEW_DATE.toLocaleDateString());

  //const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    if (!_.isEmpty(dataUpdate)) {
      //Nếu biến dataUpdate ko rỗng thì update state
      setVehicleId(dataUpdate.vehicle_id);
      setOriginalDate(dataUpdate.order_date);
      setOrderDate(dataUpdate.order_date);
      setFromNode(dataUpdate.from_node);
      setToNode(dataUpdate.to_node);
      setLoadAmount(dataUpdate.load_amount);
      setLoadName(dataUpdate.load_name);
    }
  }, [props.dataUpdate]);

  const handleSubmitCreateOrder = async () => {
    //validate: mai làm sau

    let data = await putUpdateOrder(
      dataUpdate.id,
      vehicle_id,
      order_date,
      from_node,
      to_node,
      load_amount,
      load_name
    );
    if (data) {
      //chưa có validate

      toast.success("Update succeeded!");
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
        backdrop="static" //khi bấm Esc hoặc click chuột bên ngoài thì modal ko tắt
        className="modal-add-order"
      >
        <Modal.Header closeButton>
          <Modal.Title>Update an order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-4">
              <label className="form-label">Vehicle code</label>
              <select
                className="form-select"
                value={vehicle_id}
                onChange={(event) => setVehicleId(event.target.value)}
                // disabled //tương đương disabled={true}, tức ko cho phép thay đổi trường vehicle_id
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
              <label className="form-label">Load amount (kilograms)</label>
              <input
                type="number"
                className="form-control"
                value={load_amount}
                onChange={(event) => setLoadAmount(event.target.value)}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmitCreateOrder}>
            Confirm UPDATE
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUpdateOrder;
