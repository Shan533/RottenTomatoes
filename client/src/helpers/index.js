import moment from "moment";

export const antValidationError = [
  {
    message: "Required",
    required: true,
  },
];

export const getDateTimeFormat = (date) => {
  return moment(date).format("MMM Do YYYY, h:mm A");
};

export const getDateFormat = (date) => {
  return moment(date).format("MMM Do YYYY");
};
