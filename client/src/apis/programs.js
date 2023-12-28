import apiRequest from ".";

export const AddProgram = async (payload) => {
  return await apiRequest({
    method: "POST",
    endPoint: "/api/programs",
    payload,
  });
};

export const GetAllPrograms = async () => {
  return await apiRequest({
    method: "GET",
    endPoint: "/api/programs",
  });
};

export const GetProgramById = async (id) => {
  return await apiRequest({
    method: "GET",
    endPoint: `/api/programs/${id}`,
  });
};

export const UpdateProgram = async (id, payload) => {
  return await apiRequest({
    method: "PUT",
    endPoint: `/api/programs/${id}`,
    payload,
  });
};

export const DeleteProgram = async (id) => {
  return await apiRequest({
    method: "DELETE",
    endPoint: `/api/programs/${id}`,
  });
};
