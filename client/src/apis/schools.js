import apiRequest from ".";

export const AddSchool = async (payload) => {
  return await apiRequest({
    method: "POST",
    endPoint: "/api/schools",
    payload,
  });
};

export const GetAllSchools = async () => {
  return await apiRequest({
    method: "GET",
    endPoint: "/api/schools",
  });
};

export const GetSchoolById = async (id) => {
  return await apiRequest({
    method: "GET",
    endPoint: `/api/schools/${id}`,
  });
};

export const UpdateSchool = async (id, payload) => {
  return await apiRequest({
    method: "PUT",
    endPoint: `/api/schools/${id}`,
    payload,
  });
};

export const DeleteSchool = async (id) => {
  return await apiRequest({
    method: "DELETE",
    endPoint: `/api/schools/${id}`,
  });
};
