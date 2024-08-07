import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { FaCalendarAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { postCreateNewOrder } from "../../../../../services/apiServices";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  loadNames,
  startPoints,
  endPoints,
} from "../../../../../utils/arraysUsedOften";

const NEW_DATE = new Date();
// console.log("🚀 ~ NEW_DATE:", NEW_DATE);
// console.log("🚀 ~ NEW_DATE date localized:", NEW_DATE.toLocaleDateString());

const ModalCreateOrder = (props) => {
  const { show, setShow } = props;

  const [vehicle_id, setVehicleId] = useState("1");
  const [from_node, setFromNode] = useState(startPoints[0]);
  const [to_node, setToNode] = useState(endPoints[0]);
  const [load_name, setLoadName] = useState(loadNames[0]);
  const [load_amount, setLoadAmount] = useState(0);
  const [originalDate, setOriginalDate] = useState(NEW_DATE);
  const [order_date, setOrderDate] = useState(NEW_DATE.toLocaleDateString());
  const [start_time, setStartTime] = useState(
    NEW_DATE.toLocaleTimeString([], {
      hourCycle: "h23",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  );

  const handleClose = () => {
    setShow(false);
    setVehicleId("1");
    setOriginalDate(NEW_DATE);
    setOrderDate(NEW_DATE.toLocaleDateString());
    setStartTime(
      NEW_DATE.toLocaleTimeString([], {
        hourCycle: "h23",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    );
    setFromNode(startPoints[0]);
    setToNode(endPoints[0]);
    setLoadAmount(0);
    setLoadName(loadNames[0]);
  };

  const handleSubmitCreateOrder = async () => {
    if (load_amount < 0) {
      toast.warning("Load amount must not be negative!");
      return;
    }

    let data = await postCreateNewOrder(
      vehicle_id,
      order_date,
      start_time,
      from_node,
      to_node,
      load_amount,
      load_name
    );

    if (data) {
      toast.success("Order successfully added!");
      handleClose();
      await props.fetchListOrders();
    }
  };

  return (
    <>
      <Modal centered show={show} onHide={() => handleClose()} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Add new order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Container>
              <Row>
                <Col md={6}>
                  <Form.Label>Vehicle code</Form.Label>
                  <Form.Select
                    value={vehicle_id}
                    onChange={(event) => setVehicleId(event.target.value)}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </Form.Select>
                </Col>
                <Col md={6}>
                  <div>
                    <Form.Label>
                      Date <i>(month/date/year)</i> and Time
                    </Form.Label>
                    <div>
                      <DatePicker
                        // className="form-select"
                        showIcon
                        icon={<FaCalendarAlt />}
                        toggleCalendarOnIconClick
                        customInput={<input className="form-select" />}
                        selected={originalDate}
                        minDate={NEW_DATE}
                        showTimeInput
                        timeInputLabel="Time:"
                        dateFormat="MM/dd/yyyy h:mm aa"
                        onChange={(date) => {
                          setOriginalDate(date);
                          // setOrderDate(date.toJSON()); // ! bị chậm theo giờ UTC
                          setOrderDate(date.toLocaleDateString()); // * đúng theo giờ local
                          setStartTime(
                            date.toLocaleTimeString([], {
                              hourCycle: "h23",
                              hour: "2-digit",
                              minute: "2-digit",
                              second: "2-digit",
                            })
                          ); // * đúng theo giờ local
                        }}
                      />
                    </div>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Label>Start point</Form.Label>
                  <Form.Select
                    value={from_node}
                    type="number"
                    onChange={(event) => setFromNode(event.target.value)}
                  >
                    {startPoints.map((startPoint) => (
                      <option value={startPoint}>{startPoint}</option>
                    ))}
                  </Form.Select>
                </Col>
                <Col>
                  <Form.Label>End point</Form.Label>
                  <Form.Select
                    value={to_node}
                    type="number"
                    onChange={(event) => setToNode(event.target.value)}
                  >
                    {endPoints.map((endPoint) => (
                      <option value={endPoint}>{endPoint}</option>
                    ))}
                  </Form.Select>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Label>Load name</Form.Label>
                  <Form.Select
                    value={load_name}
                    type="number"
                    onChange={(event) => setLoadName(event.target.value)}
                  >
                    {loadNames.map((loadName) => (
                      <option value={loadName}>{loadName}</option>
                    ))}
                  </Form.Select>
                </Col>
                <Col>
                  <Form.Label>
                    Load amount <i>(kilograms)</i>
                  </Form.Label>
                  <input
                    type="number"
                    min="0"
                    className="form-control"
                    value={load_amount}
                    onChange={(event) => setLoadAmount(event.target.value)}
                  />
                </Col>
              </Row>
            </Container>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose()}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSubmitCreateOrder()}>
            Send to draft
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalCreateOrder;
