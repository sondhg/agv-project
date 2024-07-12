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

      toast.success("Deletion done!");
      handleClose();
      await props.fetchListOrders();
    }
  };
  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
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
                {dataDelete && dataDelete.previous_node
                  ? dataDelete.previous_node
                  : ""}
              </b>{" "}
            </li>
            <li>
              End point:{" "}
              <b>
                {dataDelete && dataDelete.next_node ? dataDelete.next_node : ""}
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
                {dataDelete && dataDelete.quick_note
                  ? dataDelete.quick_note
                  : ""}
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
