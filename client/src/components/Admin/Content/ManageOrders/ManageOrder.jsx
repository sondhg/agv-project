import ModalCreateOrder from "./Modals/ModalCreateOrder";
import "./ManageOrder.scss";
import { useEffect, useState } from "react";
import { getAllOrders } from "../../../../services/apiServices";
import "react-toastify/dist/ReactToastify.css";
import TableOrders from "./DraftTable/TableOrders";
import ModalUpdateOrder from "./Modals/ModalUpdateOrder";
import ModalDeleteOrder from "./Modals/ModalDeleteOrder";
import ModalProceedOrder from "./Modals/ModalProceedOrder";
import { CSVLink } from "react-csv";
import { FcPlus } from "react-icons/fc";
import { FaFileExport } from "react-icons/fa";
import { FaFileImport } from "react-icons/fa";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Papa from "papaparse";
import { toast } from "react-toastify";

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

  // test purpose
  const csvData = [
    ["firstname", "lastname", "email"],
    ["Ahmed", "Tomi", "ah@smthing.co.com"],
    ["Raed", "Labes", "rl@smthing.co.com"],
    ["Yezzi", "Min l3b", "ymin@cocococo.com"],
  ];

  const handleImportCSV = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      let file = event.target.files[0];
      if (file.type !== "text/csv") {
        toast.error("Wrong file format, only accept CSV!");
        return;
      }
      console.log(">>> check file imported: ", file);
      Papa.parse(file, {
        complete: function (results) {
          let rawCSV = results.data;
          if (rawCSV.length > 0) {
            if (rawCSV[0] && rawCSV[0].length === 3) {
              if (
                rawCSV[0][0] !== "order_number" ||
                rawCSV[0][1] !== "originalDate" ||
                rawCSV[0][2] !== "load_name" ||
                rawCSV[0][3] !== "load_amount" ||
                rawCSV[0][4] !== "start_time" ||
                rawCSV[0][5] !== "from_node" ||
                rawCSV[0][6] !== "to_node"
              ) {
                toast.error("Wrong Header format in CSV file!");
              } else {
                let result = [];

                rawCSV.map((item, index) => {
                  if (index > 0 && item.length === 7) {
                    let obj = {};
                    obj.order_number = item[0];
                    obj.originalDate = item[1];
                    obj.load_name = item[2];
                    obj.load_amount = item[3];
                    obj.start_time = item[4];
                    obj.from_node = item[5];
                    obj.to_node = item[6];
                    result.push(obj);
                  }
                });
                setListOrders(result);
              }
            } else {
              toast.error("Wrong format in CSV file!");
            }
          } else {
            toast.error("No data found in CSV file!");
          }
        },
      });
    }
  };

  return (
    <div className="manage-order-container">
      <h3>Manage Order</h3>
      <div className="orders-content">
        <Container fluid className="my-3">
          <Row md="auto">
            <Col>
              <div /* className="btn-add-new" */>
                <Button
                  variant="success"
                  onClick={() => setShowModalCreateOrder(true)}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <FcPlus size={25} />
                    <span className="ms-2">Add order</span>
                  </div>
                </Button>
              </div>
            </Col>
            <Col>
              <CSVLink
                filename={"orders_export.csv"}
                className="btn btn-primary"
                data={csvData}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <FaFileExport size={20} />
                  <span className="ms-2">Export CSV</span>
                </div>
              </CSVLink>
            </Col>
            <Col>
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
            </Col>
          </Row>
        </Container>
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
