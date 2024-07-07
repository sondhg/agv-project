import { useEffect, useState } from "react";
import { getDisplayAgvParams } from "../../../../services/apiServices";
import DashBoard from "./DashBoard";

const ManageDashboard = (props) => {
  const [listDisplayAgvParams, setListDisplayAgvParams] = useState([]);

  const fetchDisplayAgvParams = async () => {
    let res = await getDisplayAgvParams();
    console.log(res);
    setListDisplayAgvParams(res); //xem database để đặt thêm sau res
  };
  useEffect(() => {
    fetchDisplayAgvParams();
  }, []);

  return <DashBoard listDisplayAgvParams={listDisplayAgvParams} />;
};

export default ManageDashboard;
