const axios = require("axios");

const apiRequest = async ({ method, endPoint, payload, queryStrings }) => {
  try {
    const response = await axios(
      {
        method,
        url: endPoint,
        data: payload,
        params: queryStrings,
      },
      {
        headers: {},
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default apiRequest;
