import Table from "react-bootstrap/Table";
const TableOrders = (props) => {
  const { listOrders } = props; //giống const listOrders = props.listOrders

  return (
    <>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th scope="col">Order No.</th>
            <th scope="col">Vehicle ID</th>
            <th scope="col">Order date</th>
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
                  <td>{index + 1}</td>
                  <td>{item.vehicle_id}</td>
                  <td>{item.order_date}</td>
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
              <td colSpan={"9"}>Data not found</td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
};

export default TableOrders;
