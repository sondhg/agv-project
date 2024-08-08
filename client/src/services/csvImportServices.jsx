import { toast } from "react-toastify";
import { postAddOrder, postCreateNewOrder } from "./apiServices";
import Papa from "papaparse";

const handleImportCSV = (event) => {
  if (event.target && event.target.files && event.target.files[0]) {
    let file = event.target.files[0];
    if (file.type !== "text/csv") {
      toast.error("Wrong file format, only accept CSV!");
      return;
    }
    console.log(">>> check file imported: ", file);
    Papa.parse(file, {
      complete: function (results) {
        let rawCSV = results.data;

        if (rawCSV.length > 0) {
          if (rawCSV[0] && rawCSV[0].length === 7) {
            if (
              rawCSV[0][0] !== "id" ||
              rawCSV[0][1] !== "order_date" ||
              rawCSV[0][2] !== "load_name" ||
              rawCSV[0][3] !== "load_amount" ||
              rawCSV[0][4] !== "start_time" ||
              rawCSV[0][5] !== "from_node" ||
              rawCSV[0][6] !== "to_node"
            ) {
              toast.error("Wrong Header format in CSV file!");
            } else {
              let result = [];

              rawCSV.map((item, index) => {
                if (index > 0 && item.length === 7) {
                  let obj = {};
                  obj.id = item[0];
                  obj.order_date = item[1];
                  obj.load_name = item[2];
                  obj.load_amount = item[3];
                  obj.start_time = item[4];
                  obj.from_node = item[5];
                  obj.to_node = item[6];
                  result.push(obj);
                }
              });
              console.log(">>> result: ", result);
              toast.success("Successfully imported CSV file");
              // setListOrders(result);

              result.map((item, index) => {
                postAddOrder(item);
                // postCreateNewOrder(
                //   item.vehicle_id,
                //   item.order_date,
                //   item.start_time,
                //   item.from_node,
                //   item.to_node,
                //   item.load_amount,
                //   item.load_name
                // );
              });
            }
          } else {
            toast.error("Wrong format in CSV file!");
          }
        } else {
          toast.error("No data found in CSV file!");
        }
      },
    });
  }
};

export default handleImportCSV;
