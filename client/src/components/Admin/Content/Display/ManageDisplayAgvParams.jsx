import { useEffect, useState } from "react";
import { getDisplayAgvParams } from "../../../../services/apiServices";
import TableDisplayAgvParams from "./TableDisplayAgvParams";

const ManageDisplayAgvParams = (props) => {
  const [listDisplayAgvParams, setListDisplayAgvParams] = useState([]);

  const fetchDisplayAgvParams = async () => {
    let res = await getDisplayAgvParams();
    console.log(res);
    setListDisplayAgvParams(res); //xem database để đặt thêm sau res
  };
  useEffect(() => {
    fetchDisplayAgvParams();
    //fetchListOrdersWithPaginate(1);
  }, []);

  return <TableDisplayAgvParams listDisplayAgvParams={listDisplayAgvParams} />;
};

export default ManageDisplayAgvParams;
