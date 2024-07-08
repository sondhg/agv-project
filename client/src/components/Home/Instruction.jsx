import agvmap from "../../assets/agvmap.png";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FaHome } from "react-icons/fa";

const Instruction = () => {
  return (
    <div className="bg-dark bg-gradient text-white">
      <div className="p-5 bg-primary bg-gradient text-white text-center ">
        <h1>AGV System</h1>
        <p>Please follow the instructions below.</p>
      </div>

      <Container fluid="xl" className="mt-5">
        <Row>
          <Col sm={4}>
            <Container className="border border-2 rounded border-primary-subtle bg-primary bg-gradient p-3 mt-4">
              <h3>Map</h3>
              <div className="fakeimg">
                <img src={agvmap} width="300px"></img>
              </div>
              <p>All paths are measured in centimeters.</p>
              <hr className="d-sm-none" />
            </Container>
          </Col>
          <Col sm={8}>
            <Container className="border border-2 rounded border-secondary bg-secondary p-3 mt-4">
              <h3>Operating instructions</h3>
              <ol className="white">
                <li>Refer to the map image</li>
                <li>
                  At the top header, click <b>"Admin"</b>
                </li>
                <li>
                  On the left sidebar, select <b>"Orders" → "Manage Orders"</b>
                </li>
                <li>
                  Click <b>"Add new order"</b>. On the pop-up modal, fill in the
                  form to select inputs for AGV
                </li>
                <li>
                  Click <b>"Send to draft"</b> to store created orders. These
                  will be shown in the table below.
                </li>
                <li>
                  On "Action" column of the table, you can update or delete
                  orders.
                </li>
                <li>
                  Once you've decided which order you want the AGV to follow,
                  click <b>"Proceed"</b> to finalize the submission.
                </li>
                <li>The AGV performs based on the proceeded inputs.</li>
                <li>
                  On the sidebar, select <b>"Dashboard"</b> to see live
                  parameters returned by AGV.
                </li>
              </ol>
              {/* <div style={{ display: "flex", alignItems: "center" }}>
                <FaHome /> <span>Enjoy responsibly!</span>
              </div> */}
            </Container>
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

export default Instruction;
