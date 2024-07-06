import React, { useEffect, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { Table } from "react-bootstrap";

export default function WebSocket() {
  const [socketUrl, setSocketUrl] = useState("ws://localhost:8000/ws/");
  const [data, setData] = useState([]);

  const { lastJsonMessage } = useWebSocket(socketUrl, {
    onOpen: () => console.log("socket-connected"),
    //Will attempt to reconnect on all close events, such as server shutting down
    shouldReconnect: (closeEvent) => true,
  });

  useEffect(() => {
    if (
      lastJsonMessage &&
      lastJsonMessage.Agv_identify &&
      lastJsonMessage.Agv_data
    ) {
      setData([
        ...data,

        {
          Agv_speed: lastJsonMessage?.Agv_data[0].Agv_speed,
          //
        },
      ]);
    }
  }, [lastJsonMessage]);
}

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

//export default TableDisplayAgvParams;
