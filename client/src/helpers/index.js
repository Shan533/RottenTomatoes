import moment from "moment";

export const antValidationError = [
  {
    message: "Required",
    required: true,
  },
];

export const getDateTimeFormat = (date) => {
  return moment(date).format("MMMM Do YYYY, h:mm:ss a");
};

export const getDateFormat = (date) => {
  return moment(date).format("MMMM Do YYYY");
};
