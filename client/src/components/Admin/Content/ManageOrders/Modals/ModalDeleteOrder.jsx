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
              Vehicle code: <b>{dataDelete.vehicle_id}</b>
            </li>
            <li>
              Order date: <b>{dataDelete.order_date}</b>
            </li>
            <li>
              Start time: <b>{dataDelete.start_time}</b>
            </li>
            <li>
              From node: <b>{dataDelete.from_node}</b>
            </li>
            <li>
              To node: <b>{dataDelete.to_node}</b>
            </li>
            <li>
              Load name: <b>{dataDelete.load_name}</b>
            </li>
            <li>
              Load amount: <b>{dataDelete.load_amount}</b>
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
