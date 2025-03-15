import apiRequest from ".";

export const RegisterGmail = async (payload) => {
  return await apiRequest({
    method: "POST",
    endPoint: "/api/oauth/register",
    payload,
  });
};

export const LoginGmail = async (payload) => {
  return await apiRequest({
    method: "POST",
    endPoint: "/api/oauth/login",
    payload,
  });
};
