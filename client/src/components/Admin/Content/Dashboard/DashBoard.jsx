import React, { useEffect, useRef, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

import { IoIosSpeedometer } from "react-icons/io";
import { IoIosWarning } from "react-icons/io";
import { FaBatteryHalf } from "react-icons/fa";
import { GiPathDistance } from "react-icons/gi";
import { FaCar } from "react-icons/fa";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { LineChart, XAxis, CartesianGrid, Tooltip, Line } from "recharts";

import MyCard from "./components/MyCard";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const account = useSelector((state) => state.user.account);
  const access_token = account.jwt;

  const [socketUrl, setSocketUrl] = useState(
    `ws://localhost:8000/ws/?token=${access_token}`
  );
  //hỏi HA xem link có cần token ko? kiểu như `.../${jwt}`
  const [data, setData] = useState([]);

  const { lastJsonMessage, readyState, lastMessage } = useWebSocket(socketUrl, {
    onOpen: () => console.log("socket-connected"),
    share: false,
    shouldReconnect: () => true,
  });

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  useEffect(() => {
    if (lastJsonMessage) {
      setData({
        speed: lastJsonMessage.Agv_speed,
        battery: lastJsonMessage.Agv_battery,
        distance: lastJsonMessage.Agv_distance,
      });
    }
  }, [lastJsonMessage]);

  return (
    <div>
      {/* <div>The WebSocket is currently {connectionStatus}</div>
      {lastMessage ? <div>Last message: {lastMessage.data}</div> : null}
      {lastJsonMessage? <div>Last JSON message for PRICE: {lastJsonMessage.p}</div> : null} */}
      <h3>WebSocket Dashboard</h3>
      <div>
        <Container
          className="border border-2 rounded border-dark-subtle p-3 mt-4 bg-secondary text-white"
          style={{ width: "60rem" }}
        >
          <Row>
            <div style={{ display: "flex", alignItems: "center" }}>
              <FaCar size={25} />
              <span className="ms-2">
                <h4>AGV 1</h4>
              </span>
            </div>
          </Row>
          <Row xs={1} md={4}>
            <MyCard
              title="Speed"
              dataDisplay={`${data.speed} m/s`}
              icon={<IoIosSpeedometer />}
              bg="primary"
              text="white"
            />
            <MyCard
              title="Obstacle detected"
              dataDisplay={data.time} //HA chưa tạo biến check có/ko có vật cản
              icon={<IoIosWarning />}
              bg="danger"
              text="white"
            />
            <MyCard
              title="Battery"
              dataDisplay={data.battery}
              icon={<FaBatteryHalf />}
              bg="success"
              text="white"
            />
            <MyCard
              title="Distance traveled"
              dataDisplay={data.distance}
              icon={<GiPathDistance />}
              bg="info"
              text="white"
            />
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Dashboard;
