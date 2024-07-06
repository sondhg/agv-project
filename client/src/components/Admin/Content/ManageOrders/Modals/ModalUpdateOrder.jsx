import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { putUpdateOrder } from "../../../../../services/apiServices";
import _ from "lodash";

const ModalUpdateOrder = (props) => {
  const { show, setShow, dataUpdate } = props;
  //ko cần dùng props.dataUpdate ở phần code sau nữa, chỉ cần dùng biến dataUpdate

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
  //const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    if (!_.isEmpty(dataUpdate)) {
      //Nếu biến dataUpdate ko rỗng thì update state
      setVehicleCode(dataUpdate.vehicleCode);
      setStartPoint(dataUpdate.startPoint);
      setEndPoint(dataUpdate.endPoint);
      setQuickNote(dataUpdate.quickNote);
    }
  }, [props.dataUpdate]);

  const handleSubmitCreateOrder = async () => {
    //validate: mai làm sau

    let data = await putUpdateOrder(
      dataUpdate.id,
      startPoint,
      endPoint,
      quickNote
    );
    //cần phần headers thì mới chạy đc, vì json-server của mình ko hoạt động với formdata giống video
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
                value={vehicleCode}
                onChange={(event) => setVehicleCode(event.target.value)}
                disabled //tương đương disabled={true}, tức ko cho phép thay đổi trường vehicleCode
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
            Confirm UPDATE
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUpdateOrder;
