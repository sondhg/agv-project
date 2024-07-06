import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { proceedOrder, deleteOrder } from "../../../../../services/apiServices";
import { toast } from "react-toastify";

const ModalProceedOrder = (props) => {
  const { show, setShow, dataProceed } = props;
  const handleClose = () => setShow(false);
  const handleSubmitProceedOrder = async () => {
    let data = await (proceedOrder(dataProceed), deleteOrder(dataProceed.id));

    if (data) {
      toast.success("Order sent to AGV!");
      handleClose();
      await props.fetchListOrders();
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Send this order to AGV?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            <li>
              Vehicle code:{" "}
              <b>
                {dataProceed && dataProceed.vehicleCode
                  ? dataProceed.vehicleCode
                  : ""}
              </b>{" "}
            </li>
            <li>
              Start point:{" "}
              <b>
                {dataProceed && dataProceed.startPoint
                  ? dataProceed.startPoint
                  : ""}
              </b>{" "}
            </li>
            <li>
              End point:{" "}
              <b>
                {dataProceed && dataProceed.endPoint
                  ? dataProceed.endPoint
                  : ""}
              </b>{" "}
            </li>
            <li>
              Quick note:{" "}
              <b>
                {dataProceed && dataProceed.quickNote
                  ? dataProceed.quickNote
                  : ""}
              </b>{" "}
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
