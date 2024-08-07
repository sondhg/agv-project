import ModalCreateOrder from "./Modals/ModalCreateOrder";
import "./ManageOrder.scss";
import { useEffect, useState } from "react";
import {
  getAllOrders,
  postCreateNewOrder,
} from "../../../../services/apiServices";
import "react-toastify/dist/ReactToastify.css";
import TableOrders from "./DraftTable/TableOrders";
import ModalUpdateOrder from "./Modals/ModalUpdateOrder";
import ModalDeleteOrder from "./Modals/ModalDeleteOrder";
import ModalProceedOrder from "./Modals/ModalProceedOrder";
import { CSVLink } from "react-csv";
import { FcPlus } from "react-icons/fc";
import { FaFileExport } from "react-icons/fa";
import { FaFileImport } from "react-icons/fa";
import { FcIdea } from "react-icons/fc";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
import handleImportCSV from "../../../../services/csvImportServices";
import ModalCsvGuide from "./Modals/ModalCsvGuide";

const ManageOrder = (props) => {
  const [showModalCreateOrder, setShowModalCreateOrder] = useState(false);
  const [showModalUpdateOrder, setShowModalUpdateOrder] = useState(false);
  const [showModalDeleteOrder, setShowModalDeleteOrder] = useState(false);
  const [showModalProceedOrder, setShowModalProceedOrder] = useState(false);

  const [showModalCsvGuide, setShowModalCsvGuide] = useState(false);

  const [dataUpdate, setDataUpdate] = useState({});
  const [dataDelete, setDataDelete] = useState({});
  const [dataProceed, setDataProceed] = useState({});

  const [listOrders, setListOrders] = useState([]);

  const [dataExport, setDataExport] = useState([]);

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

  // // test purpose
  // const csvData = [
  //   ["firstname", "lastname", "email"],
  //   ["Ahmed", "Tomi", "ah@smthing.co.com"],
  //   ["Raed", "Labes", "rl@smthing.co.com"],
  //   ["Yezzi", "Min l3b", "ymin@cocococo.com"],
  // ];

  const getOrdersExport = (event, done) => {
    let result = [];
    if (listOrders && listOrders.length > 0) {
      result.push([
        "id",
        "order_date",
        "load_name",
        "load_amount",
        "start_time",
        "from_node",
        "to_node",
      ]);
      listOrders.map((item, index) => {
        let arr = [];
        arr[0] = item.id;
        arr[1] = item.order_date;
        arr[2] = item.load_name;
        arr[3] = item.load_amount;
        arr[4] = item.start_time;
        arr[5] = item.from_node;
        arr[6] = item.to_node;
        result.push(arr);
      });
      setDataExport(result);
      done();
    }
  };

  return (
    <div className="manage-order-container">
      <h3>Manage Orders</h3>
      <div className="orders-content">
        <Stack direction="horizontal" gap={3} className="p-2">
          <div className="p-2">
            <Button
              size="lg"
              variant="success"
              onClick={() => setShowModalCreateOrder(true)}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <FcPlus size={25} />
                <span className="ms-2">Add order</span>
              </div>
            </Button>
          </div>
          <div className="p-2">
            <CSVLink
              filename={"orders_export.csv"}
              className="btn btn-primary"
              data={dataExport}
              asyncOnClick={true}
              onClick={(event, done) => getOrdersExport(event, done)}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <FaFileExport size={20} />
                <span className="ms-2">Export CSV</span>
              </div>
            </CSVLink>
          </div>
          <div className="p-2">
            <label htmlFor="import-csv" className="btn btn-warning">
              <div style={{ display: "flex", alignItems: "center" }}>
                <FaFileImport size={20} />
                <span className="ms-2">Import CSV</span>
              </div>
            </label>
            <input
              id="import-csv"
              type="file"
              hidden
              onChange={(event) => {
                handleImportCSV(event);
              }}
            />
          </div>
          <div className="p-2 ms-auto">
            <Button variant="info" onClick={() => setShowModalCsvGuide(true)}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <FcIdea size={25} />
                <span className="ms-2">Guide on import CSV</span>
              </div>
            </Button>
          </div>
        </Stack>

        <div className="table-orders-container">
          <TableOrders
            listOrders={listOrders}
            setListOrders={setListOrders}
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
        <ModalCsvGuide
          show={showModalCsvGuide}
          setShow={setShowModalCsvGuide}
        />
      </div>
    </div>
  );
};

export default ManageOrder;
