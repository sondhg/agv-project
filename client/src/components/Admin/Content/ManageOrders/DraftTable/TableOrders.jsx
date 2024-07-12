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
            <th scope="col">Start point</th>
            <th scope="col">End point</th>
            <th scope="col">Load amount</th>
            <th scope="col">Quick note</th>
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
                  <td>{item.previous_node}</td>
                  <td>{item.next_node}</td>
                  <td>{item.load_amount}</td>
                  <td>{item.quick_note}</td>
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
              <td colSpan={"7"}>Data not found</td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
};

export default TableOrders;
