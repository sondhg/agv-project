import React, { useEffect, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import Stack from "react-bootstrap/Stack";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import { IoIosSpeedometer } from "react-icons/io";
import { IoIosWarning } from "react-icons/io";

const MyCard = (props) => {
  const { title, dataDisplay, icon } = props;
  return (
    <Card /* className="bg-dark text-white" */ border="primary">
      <Card.Header>{icon}</Card.Header>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{dataDisplay}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default function WebSocketDisplayBitcoin() {
  const [socketUrl, setSocketUrl] = useState(
    "wss://stream.binance.com:9443/ws/btcusdt@trade"
  );
  const [data, setData] = useState([]);

  const { lastJsonMessage, readyState } = useWebSocket(socketUrl, {
    onOpen: () => console.log("socket-connected"),
    share: false,
    shouldReconnect: () => true,
  });

  useEffect(() => {
    if (lastJsonMessage) {
      setData({
        price: lastJsonMessage.p,
        time: lastJsonMessage.t,
      });
    }
  }, [lastJsonMessage]);

  return (
    <div>
      <div>The price is {data.price}</div>
      <div>The time is {data.time}</div>
      <div className="container">
        <Stack gap={5} className="col-md-5 mx-auto">
          <CardGroup>
            <MyCard 
              title="Speed"
              dataDisplay={data.price}
              icon={<IoIosSpeedometer />}
            />
            <MyCard
              title="Obstacle detected"
              dataDisplay={data.time}
              icon={<IoIosWarning />}
            />
          </CardGroup>
        </Stack>
      </div>
    </div>
  );
}
