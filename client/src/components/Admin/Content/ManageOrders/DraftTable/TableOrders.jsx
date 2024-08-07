import Table from "react-bootstrap/Table";
import "./TableOrders.scss";
import { TbArrowsSort } from "react-icons/tb";
import { FaLongArrowAltUp } from "react-icons/fa";
import { FaLongArrowAltDown } from "react-icons/fa";
import { useState } from "react";
import _ from "lodash";
const TableOrders = (props) => {
  const { listOrders, setListOrders } = props; //giống const listOrders = props.listOrders

  const [sortBy, setSortBy] = useState("asc");
  const [sortField, setSortField] = useState("id");

  const handleSort = (sortBy, sortField) => {
    setSortBy(sortBy);
    setSortField(sortField);

    let cloneListOrders = _.cloneDeep(listOrders);
    cloneListOrders = _.orderBy(cloneListOrders, [sortField], [sortBy]);
    setListOrders(cloneListOrders);
    console.log(cloneListOrders);
  };

  return (
    <>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th scope="col">
              <div className="sort-header">
                <span>Order ID</span>
                <span>
                  <i onClick={() => handleSort("desc", "id")}>
                    <FaLongArrowAltDown />
                  </i>
                  <i onClick={() => handleSort("asc", "id")}>
                    <FaLongArrowAltUp />
                  </i>
                </span>
              </div>
            </th>
            <th scope="col">
              <div className="sort-header">
                <span>Vehicle ID</span>
                <span>
                  <i onClick={() => handleSort("desc", "vehicle_id")}>
                    <FaLongArrowAltDown />
                  </i>
                  <i onClick={() => handleSort("asc", "vehicle_id")}>
                    <FaLongArrowAltUp />
                  </i>
                </span>
              </div>
            </th>
            <th scope="col">
              <div className="sort-header">
                <span>Order date</span>
                <span>
                  <i onClick={() => handleSort("desc", "order_date")}>
                    <FaLongArrowAltDown />
                  </i>
                  <i onClick={() => handleSort("asc", "order_date")}>
                    <FaLongArrowAltUp />
                  </i>
                </span>
              </div>
            </th>
            <th scope="col">
              <div className="sort-header">
                <span>Start time</span>
                <span>
                  <i onClick={() => handleSort("desc", "start_time")}>
                    <FaLongArrowAltDown />
                  </i>
                  <i onClick={() => handleSort("asc", "start_time")}>
                    <FaLongArrowAltUp />
                  </i>
                </span>
              </div>
            </th>
            <th scope="col">From node</th>
            <th scope="col">To node</th>
            <th scope="col">Load name</th>
            <th scope="col">Load amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {listOrders &&
            listOrders.length > 0 &&
            listOrders.map((item, index) => {
              return (
                <tr key={`table-orders-${index}`}>
                  <td>{item.id}</td>
                  <td>{item.vehicle_id}</td>
                  <td>{item.order_date}</td>
                  <td>{item.start_time}</td>
                  <td>Node {item.from_node}</td>
                  <td>Node {item.to_node}</td>
                  <td>{item.load_name}</td>
                  <td>{item.load_amount} kg</td>
                  <td>
                    <button
                      className="btn btn-success"
                      onClick={() => props.handleClickBtnProceed(item)}
                    >
                      Proceed
                    </button>
                    <button
                      className="btn btn-warning mx-3"
                      onClick={() => props.handleClickBtnUpdate(item)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => props.handleClickBtnDelete(item)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          {listOrders && listOrders.length === 0 && (
            <tr>
              <td colSpan={"10"}>Data not found</td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
};

export default TableOrders;
