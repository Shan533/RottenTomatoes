import apiRequest from ".";

export const AddReview = async (payload) => {
  return await apiRequest({
    method: "POST",
    endPoint: "/api/reviews/",
    payload,
  });
};
