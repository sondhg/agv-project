import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { putUpdateUser } from "../../../../../services/apiServices";
import _ from "lodash";

const ModalUpdateUser = (props) => {
  const { show, setShow, dataUpdate } = props;
  //ko cần dùng props.dataUpdate ở phần code sau nữa, chỉ cần dùng biến dataUpdate

  const handleClose = () => {
    setShow(false);
    setEmail("McLaren");
    setPassword("A");
    setUsername("A");
    setRole("");
    props.resetUpdateUser();
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("USER");
  //const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    if (!_.isEmpty(dataUpdate)) {
      //Nếu biến dataUpdate ko rỗng thì update state
      setEmail(dataUpdate.email);
      setPassword(dataUpdate.password);
      setUsername(dataUpdate.username);
      setRole(dataUpdate.role);
    }
  }, [props.dataUpdate]);

  const handleSubmitCreateUser = async () => {
    //validate: mai làm sau

    let data = await putUpdateUser(dataUpdate.id, password, username, role);
    //cần phần headers thì mới chạy đc, vì json-server của mình ko hoạt động với formdata giống video
    if (data) {
      //chưa có validate

      toast.success("Update succeeded!");
      handleClose();
      await props.fetchListUsers();
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="xl"
        backdrop="static" //khi bấm Esc hoặc click chuột bên ngoài thì modal ko tắt
        className="modal-add-user"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add new user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                disabled
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Role</label>
              <select
                className="form-select"
                value={role}
                onChange={(event) => setRole(event.target.value)}
              >
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmitCreateUser}>
            Update user info
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUpdateUser;
