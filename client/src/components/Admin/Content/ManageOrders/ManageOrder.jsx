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
import { FcIdea } from "react-icons/fc";
import Button from "react-bootstrap/esm/Button";
import Stack from "react-bootstrap/Stack";
import ModalCsvGuide from "./Modals/ModalCsvGuide";
import _ from "lodash";
import { debounce } from "lodash";

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
    // console.log(">>> res: ", res);
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

  const handleSearch = debounce((event) => {
    let term = event.target.value;
    if (term) {
      let cloneListOrders = _.cloneDeep(listOrders);
      cloneListOrders = cloneListOrders.filter((item) =>
        item.order_date.includes(term)
      );
      setListOrders(cloneListOrders);
    } else {
      fetchListOrders();
    }
  }, 500);

  console.log(">>> listOrders: ", listOrders);

  // console.log(">>> a: ", a); //*dòng này dùng test lỗi: code sai thay vì nát UI thì sẽ đẩy sang fallback UI nhờ react-error-boundary
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
          <div className="p-2 ">
            <Button
              variant="info"
              size="lg"
              onClick={() => setShowModalCsvGuide(true)}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <FcIdea size={25} />
                <span className="ms-2">Import CSV</span>
              </div>
            </Button>
          </div>
          <div className="p-2">
            <CSVLink
              filename={"orders_export.csv"}
              className="btn btn-primary btn-lg"
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
          <div className="ms-auto col-12 col-sm-4 my-3">
            <input
              className="form-control"
              placeholder="Search order by date"
              // value={keyword}
              onChange={(event) => handleSearch(event)}
            />
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
