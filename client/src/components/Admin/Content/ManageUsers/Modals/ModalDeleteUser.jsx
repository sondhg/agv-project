import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteUser } from "../../../../../services/apiServices";
import { toast } from "react-toastify";

const ModalDeleteUser = (props) => {
  const { show, setShow, dataDelete } = props;

  const handleClose = () => setShow(false);
  const handleSubmitDeleteUser = async () => {
    let data = await deleteUser(dataDelete.id);

    if (data) {
      //chưa có validate

      toast.success("Deletion done!");
      handleClose();
      await props.fetchListUsers();
    }
  };
  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Are you sure you want to delete this user?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            <li>
              Vehicle code:{" "}
              <b>
                {dataDelete && dataDelete.email
                  ? dataDelete.email
                  : ""}
              </b>{" "}
            </li>
            <li>
              Start point:{" "}
              <b>
                {dataDelete && dataDelete.password
                  ? dataDelete.password
                  : ""}
              </b>{" "}
            </li>
            <li>
              End point:{" "}
              <b>
                {dataDelete && dataDelete.username ? dataDelete.username : ""}
              </b>{" "}
            </li>
            <li>
              Quick note:{" "}
              <b>
                {dataDelete && dataDelete.role ? dataDelete.role : ""}
              </b>{" "}
            </li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose()}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleSubmitDeleteUser()}>
            Confirm DELETE
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteUser;
