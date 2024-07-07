import React, { useEffect, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { Table } from "react-bootstrap";

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
    </div>
  );
}


