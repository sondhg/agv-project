import "./Dashboard.scss";

// const DashBoard = (props) => {
//   return (
//     <div className="dashboard-container">
//       <div className="title">Analytics Dashboard</div>
//       <div className="content">
//         <div className="c-left">
//           <div className="child">
//             <span className="text-1">Total Draft Orders</span>
//             <span className="text-2">14</span>
//           </div>
//           <div className="child">
//             <span className="text-1">Total Proceeded Orders</span>
//             <span className="text-2">3</span>
//           </div>

//         </div>
//         <div className="c-right"></div>
//       </div>
//     </div>
//   );
// };

// export default DashBoard;

import * as React from "react";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const DashBoard = (props) => {
  const { listDisplayAgvParams } = props;

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <div className="dashboard-container">
      <div className="title">Analytics Dashboard</div>
      <div className="content">
        {listDisplayAgvParams &&
          listDisplayAgvParams.length > 0 &&
          listDisplayAgvParams.map((item, index) => {
            return (
              <div>
                <Stack direction="row" spacing={2}>
                  <div className="title">AGV {item.vehicle_code}</div>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h5" component="div">
                        Speed
                      </Typography>
                      <Typography variant="body2">{item.Agv_speed}</Typography>
                    </CardContent>
                  </Card>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h5" component="div">
                      Obstacle detected:
                      </Typography>
                      <Typography variant="body2">{item.is_obstacle}</Typography>
                    </CardContent>
                  </Card>
                </Stack>
              </div>
            );
          })}
        {/* graph */}
      </div>
    </div>
  );
};

export default DashBoard;
