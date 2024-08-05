import axios from "axios";

// const API_BASE_URL = "http://localhost:5000/api";
// const API_BASE_URL = "http://192.168.0.106:5000/api";
const API_BASE_URL = "https://hrms-backend-kykk.onrender.com";

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const RegisterEmployee = (data) => api.post("/employees", data);
export const loginEmployee = (data) => api.post("/employees/login", data);
export const getEmployees = () => api.get("/employees");
export const getEmployeeById = (id) => api.get(`/employees/${id}`);
export const updateEmployee = (id, data) => api.put(`/employees/${id}`, data);
export const deleteEmployee = (id) => api.delete(`/employees/${id}`);

// Contact Details
export const getContactDetails = () => api.get("/contact-details");
export const createContactDetails = (data) =>
  api.post("/contact-details", data);
export const updateContactDetails = (data) => api.put("/contact-details", data);
export const deleteContactDetails = (data) =>
  api.delete("/contact-details", { data });

// Birthday
export const getBirthdayDetails = () => api.get("/birthdays");

// Anniversary
export const getWorkAnniversaryDetails = () =>
  api.get("/work-anniversaries");

// Profile Picture Operations
export const getProfilePicture = (employeeId) => 
  api.get(`/profile/${employeeId}/picture`);

export const uploadProfilePicture = (employeeId, file) => {
  const formData = new FormData();
  formData.append("profilePicture", file);

  return api.post(`/profile/${employeeId}/picture`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteProfilePicture = (employeeId) => 
  api.delete(`/profile/${employeeId}/picture`);


export default api;
