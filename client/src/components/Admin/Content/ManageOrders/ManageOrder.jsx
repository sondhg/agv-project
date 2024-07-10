import ModalCreateOrder from "./Modals/ModalCreateOrder";
import "./ManageOrder.scss";
import { FcPlus } from "react-icons/fc";
import { useEffect, useState } from "react";
import { getAllOrders } from "../../../../services/apiServices";
import "react-toastify/dist/ReactToastify.css";
import TableOrders from "./DraftTable/TableOrders";
import ModalUpdateOrder from "./Modals/ModalUpdateOrder";
import ModalDeleteOrder from "./Modals/ModalDeleteOrder";
import ModalProceedOrder from "./Modals/ModalProceedOrder";

const ManageOrder = (props) => {
  const LIMIT_ORDER = 6;
  const [showModalCreateOrder, setShowModalCreateOrder] = useState(false);
  const [showModalUpdateOrder, setShowModalUpdateOrder] = useState(false);
  const [showModalDeleteOrder, setShowModalDeleteOrder] = useState(false);
  const [showModalProceedOrder, setShowModalProceedOrder] = useState(false);

  const [dataUpdate, setDataUpdate] = useState({});
  const [dataDelete, setDataDelete] = useState({});
  const [dataProceed, setDataProceed] = useState({});

  const [listOrders, setListOrders] = useState([]);

  const fetchListOrders = async () => {
    let res = await getAllOrders();
    console.log(">>> res: ", res);
    setListOrders(res); //xem database để đặt thêm sau res
  };

  const handleClickBtnProceed = (order) => {
    setShowModalProceedOrder(true);
    setDataProceed(order);
    console.log(">>> proceed order ", order);
  };

  const handleClickBtnUpdate = (order) => {
    setShowModalUpdateOrder(true);
    setDataUpdate(order);
    console.log(">>> update order ", order);
  };

  const handleClickBtnDelete = (order) => {
    setShowModalDeleteOrder(true);
    console.log(">>> delete order: ", order);
    setDataDelete(order);
  };

  const resetUpdateData = () => {
    setDataUpdate({});
  };

  useEffect(() => {
    fetchListOrders();
  }, []);

  return (
    <div className="manage-order-container">
      <h3>Manage Order</h3>
      <div className="orders-content">
        <div className="btn-add-new">
          <button
            className="btn btn-primary"
            onClick={() => setShowModalCreateOrder(true)}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <FcPlus size={25} />
              <span className="ms-2">Add new order</span>
            </div>
          </button>
        </div>

        <div className="table-orders-container">
          <TableOrders
            listOrders={listOrders}
            handleClickBtnUpdate={handleClickBtnUpdate}
            handleClickBtnDelete={handleClickBtnDelete}
            handleClickBtnProceed={handleClickBtnProceed}
          />
        </div>
        <ModalCreateOrder
          show={showModalCreateOrder}
          setShow={setShowModalCreateOrder}
          fetchListOrders={fetchListOrders}
        />
        <ModalUpdateOrder
          show={showModalUpdateOrder}
          setShow={setShowModalUpdateOrder}
          dataUpdate={dataUpdate}
          fetchListOrders={fetchListOrders}
          resetUpdateData={resetUpdateData}
        />
        <ModalDeleteOrder
          show={showModalDeleteOrder}
          setShow={setShowModalDeleteOrder}
          dataDelete={dataDelete}
          fetchListOrders={fetchListOrders}
        />
        <ModalProceedOrder
          show={showModalProceedOrder}
          setShow={setShowModalProceedOrder}
          dataProceed={dataProceed}
          fetchListOrders={fetchListOrders}
        />
      </div>
    </div>
  );
};

export default ManageOrder;
