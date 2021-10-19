import axios from "axios";

const baseURL = "http://localhost:8080";

const handleLoginApi = (email, password) => {
  return axios.post(`${baseURL}/api/login`, { email, password });
};

const getAllUsers = (id) => {
  return axios.get(`${baseURL}/api/get-all-users?id=${id}`);
};

const createNewUserService = (data) => {
  return axios.post(`${baseURL}/api/create-new-user`, data);
};

const deleteUser = (id) => {
  return axios.delete(`${baseURL}/api/delete-user`, { data: { id } });
};

const editUserApi = (data) => {
  return axios.put(`${baseURL}/api/edit-user`, data);
};

const getALLCodeSerVice = (inputType) => {
  return axios.get(`${baseURL}/api/allcode?type=${inputType}`);
};

const getTopDoctorHomeService = (limit) => {
  return axios.get(`/api/top-doctor-home?limit=${limit}`)
}

export {
  handleLoginApi,
  getAllUsers,
  createNewUserService,
  deleteUser,
  editUserApi,
  getALLCodeSerVice,
  getTopDoctorHomeService
};
