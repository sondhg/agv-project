import agvmap from "../../assets/agvmap.png";

const Instruction = () => {
  return (
    <div>
      <div className="p-5 bg-primary text-white text-center">
        <h1>AGV System</h1>
        <p>Please follow the operation instructions below.</p>
      </div>

      <div className="container mt-5">
        <div className="row">
          <div className="col-sm-4">
            <h2>Map</h2>
            <div className="fakeimg"><img src={agvmap} width="300px"></img></div>
            <p>All paths are measured in centimeters.</p>
            {/* <h3 className="mt-4">Some Links</h3>
            <p>Lorem ipsum dolor sit ame.</p>
            <ul className="nav nav-pills flex-column">
              <li className="nav-item">
                <a className="nav-link active" href="#">
                  Active
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Link
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Link
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" href="#">
                  Disabled
                </a>
              </li>
            </ul> */}
            <hr className="d-sm-none" />
          </div>
          <div className="col-sm-8">
            <h2>How to operate the system?</h2>
            <h5>Follow this step-by-step instruction:</h5>
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
                Click <b>"Send to draft"</b> to store created orders. These will
                be shown in the table below.
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
                On the sidebar, select{" "}
                <b>"Orders" → "Real-time Data Display"</b> to see live
                parameters from the AGV during the travel process.
              </li>
            </ol>
          </div>
        </div>
      </div>

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
