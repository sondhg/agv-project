import agvmap from "../../assets/agvmap.png";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

const Home = () => {
  return (
    <div className="bg-dark bg-gradient text-white">
      <div className="p-5 bg-primary bg-gradient text-white text-center ">
        <h1>AGV System</h1>
        <p>Please follow the instructions below.</p>
      </div>

      <Container fluid="xl" className="mt-5">
        <Row>
          <Col md={4}>
            <Card data-bs-theme="dark">
              <Card.Body>
                <Card.Title>Map</Card.Title>
              </Card.Body>
              <Card.Img variant="bottom" src={agvmap} />
              <Card.Footer>
                <small className="text-muted">
                  All paths are measured in centimeters.
                </small>
              </Card.Footer>
            </Card>
          </Col>
          <Col md={8}>
            <Card data-bs-theme="dark">
              <Card.Body>
                <Card.Title>Operating instructions</Card.Title>
              </Card.Body>
              <ListGroup
                className="list-group-flush"
                as="ol"
                numbered
                data-bs-theme="light"
              >
                <ListGroup.Item>Login with registered account</ListGroup.Item>
                <ListGroup.Item>Refer to the map image</ListGroup.Item>
                <ListGroup.Item>
                  At the top header, click <b>"Admin"</b>
                </ListGroup.Item>
                <ListGroup.Item>
                  On the left sidebar, select <b>"Orders" → "Manage Orders"</b>
                </ListGroup.Item>
                <ListGroup.Item>
                  Click <b>"Add order"</b>. On the pop-up modal, fill in the
                  form to select inputs for AGV
                </ListGroup.Item>
                <ListGroup.Item>
                  Click <b>"Send to draft"</b> to store created orders. These
                  will be shown in the table below.
                </ListGroup.Item>
                <ListGroup.Item>
                  On "Action" column of the table, you can update or delete
                  orders.
                </ListGroup.Item>
                <ListGroup.Item>
                  Once you've decided which order you want the AGV to follow,
                  click <b>"Proceed"</b> to finalize the submission.
                </ListGroup.Item>
                <ListGroup.Item>
                  The AGV performs based on the proceeded inputs.
                </ListGroup.Item>
                <ListGroup.Item>
                  On the sidebar, select <b>"Dashboard"</b> to see live
                  parameters returned by AGV.
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>

      <div className="mt-5 p-4 bg-dark text-white text-center">
        <p>
          &copy; Pham Hoang Anh, Dinh Hoang Son and Do Duc Toan - iPAC Lab,{" "}
          {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
};

export default Home;
