import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
//import { proceedOrder, deleteOrder } from "../../../../../services/apiServices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { HA_proceedOrder } from "../../../../../services/HA_apiServices";

const ModalProceedOrder = (props) => {
  const { show, setShow, dataProceed } = props;
  const handleClose = () => setShow(false);
  const navigate = useNavigate();

  const handleSubmitProceedOrder = async () => {
    // let data = await (proceedOrder(dataProceed), deleteOrder(dataProceed.id));

    let data = await HA_proceedOrder(dataProceed);

    if (data) {
      toast.success("Order sent to AGV!");
      handleClose();
      await props.fetchListOrders();
      navigate("/admin");
    }
  };

  return (
    <>
      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Send this order to AGV?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            <li>
              Vehicle code: <b>{dataProceed.vehicle_id}</b>
            </li>
            <li>
              Order date: <b>{dataProceed.order_date}</b>
            </li>
            <li>
              Start time: <b>{dataProceed.start_time}</b>
            </li>
            <li>
              From node: <b>{dataProceed.from_node}</b>
            </li>
            <li>
              To node:
              <b>{dataProceed.to_node}</b>
            </li>
            <li>
              Load name: <b>{dataProceed.load_name}</b>
            </li>
            <li>
              Load amount: <b>{dataProceed.load_amount}</b>
            </li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose()}>
            Cancel
          </Button>
          <Button variant="success" onClick={() => handleSubmitProceedOrder()}>
            Confirm PROCEED
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalProceedOrder;
