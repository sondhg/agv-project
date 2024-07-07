//Bảng này dựa trên API

import { Table } from "react-bootstrap";

const TableDisplayAgvParams = (props) => {
  const { listDisplayAgvParams } = props;
  return (
    <Table striped bordered hover variant="info">
      <thead>
        <tr>
          <th scope="col">Vehicle code</th>
          <th scope="col">Path</th>
          <th scope="col">Speed</th>
          <th scope="col">Obstacle encountered</th>
          <th scope="col">Battery</th>
        </tr>
      </thead>
      <tbody>
        {listDisplayAgvParams &&
          listDisplayAgvParams.length > 0 &&
          listDisplayAgvParams.map((item, index) => {
            return (
              <tr key={`table-orders-${index}`}>
                <td>{item.vehicle_code}</td>
                <td>{`From ${item.previous_node} to ${item.next_node}`}</td>
                <td>{item.Agv_speed}</td>
                <td>{item.is_obstacle}</td>
                <td>{item.Agv_battery}</td>
              </tr>
            );
          })}
      </tbody>
    </Table>
  );
};

export default TableDisplayAgvParams;

