import "./Dashboard.scss";

const DashBoard = (props) => {
  return (
    <div className="dashboard-container">
      <div className="title">Analytics Dashboard</div>
      <div className="content">
        <div className="c-left">
          <div className="child">
            <span className="text-1">Total Draft Orders</span>
            <span className="text-2">14</span>
          </div>
          <div className="child">
            <span className="text-1">Total Proceeded Orders</span>
            <span className="text-2">3</span>
          </div>
          
        </div>
        <div className="c-right"></div>
      </div>
    </div>
  );
};

export default DashBoard;
