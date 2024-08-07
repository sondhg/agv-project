import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteOrder } from "../../../../../services/apiServices";
import { toast } from "react-toastify";

const ModalDeleteOrder = (props) => {
  const { show, setShow, dataDelete } = props;

  const handleClose = () => setShow(false);
  const handleSubmitDeleteOrder = async () => {
    let data = await deleteOrder(dataDelete.id);

    if (data) {
      //chưa có validate

      toast.success("Deleted!");
      handleClose();
      await props.fetchListOrders();
    }
  };
  return (
    <>
      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure you want to delete this order?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            <li>
              Vehicle code:{" "}
              <b>
                {dataDelete && dataDelete.vehicle_id
                  ? dataDelete.vehicle_id
                  : ""}
              </b>{" "}
            </li>
            <li>
              Start point:{" "}
              <b>
                {dataDelete && dataDelete.from_node ? dataDelete.from_node : ""}
              </b>{" "}
            </li>
            <li>
              End point:{" "}
              <b>
                {dataDelete && dataDelete.to_node ? dataDelete.to_node : ""}
              </b>{" "}
            </li>
            <li>
              Load amount:{" "}
              <b>
                {dataDelete && dataDelete.load_amount
                  ? dataDelete.load_amount
                  : ""}
              </b>{" "}
            </li>
            <li>
              Quick note:{" "}
              <b>
                {dataDelete && dataDelete.load_name ? dataDelete.load_name : ""}
              </b>{" "}
            </li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose()}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleSubmitDeleteOrder()}>
            Confirm DELETE
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteOrder;
