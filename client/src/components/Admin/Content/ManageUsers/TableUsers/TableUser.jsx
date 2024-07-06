import Table from "react-bootstrap/Table";
const TableUsers = (props) => {
  const { listUsers } = props; //giống const listUsers = props.listUsers

  return (
    <>
      <Table striped bordered hover variant="light">
        <thead>
          <tr>
            <th scope="col">No.</th>
            <th scope="col">Email</th>
            <th scope="col">Password</th>
            <th scope="col">Username</th>
            <th scope="col">Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {listUsers &&
            listUsers.length > 0 &&
            listUsers.map((item, index) => {
              return (
                <tr key={`table-users-${index}`}>
                  <td>{index + 1}</td>
                  <td>{item.email}</td>
                  <td>{item.password}</td>
                  <td>{item.username}</td>
                  <td>{item.role}</td>
                  <td>
                    <button
                      className="btn btn-warning mx-3"
                      onClick={() => props.handleClickBtnUpdate(item)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => props.handleClickBtnDelete(item)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          {listUsers && listUsers.length === 0 && (
            <tr>
              <td colSpan={"6"}>Data not found</td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
};

export default TableUsers;
