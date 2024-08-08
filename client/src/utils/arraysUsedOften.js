export const vehicleIDs = Array.from({ length: 4 }, (_, index) =>
  (index + 1).toString()
); //from 1 to 4
// console.log(typeof vehicleIDs[0]);

export const startPoints = Array.from({ length: 15 }, (_, index) =>
  (index + 1).toString()
); //from 1 to 15

export const endPoints = Array.from({ length: 15 }, (_, index) =>
  (index + 1).toString()
); //from 1 to 15

export const loadNames = ["Stone", "Cement", "Steel", "Iron"];

export const inputFields = [
  "vehicle_id",
  "order_date",
  "start_time",
  "from_node",
  "to_node",
  "load_amount",
  "load_name",
];
