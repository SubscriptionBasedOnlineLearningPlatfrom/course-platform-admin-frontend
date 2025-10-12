import axios from "axios";

export const api = axios.create({
  baseURL: "https://course-platform-backend-ten.vercel.app",
});

// attach token automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// global response error formatter for api
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || "Something went wrong";
    return Promise.reject(new Error(message));
  }
);

// Axios instance for public requests (no token)
export const publicApi = axios.create({
  baseURL: "https://course-platform-backend-ten.vercel.app",
});

// global response error formatter for publicApi
publicApi.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || "Something went wrong";
    return Promise.reject(new Error(message));
  }
);

export const getAllCourses = async () => {
  const response = await publicApi.get("/admin/courses");
  return response.data;
};

export const deleteCourse = async (courseId) => {
  const response = await publicApi.delete(`/admin/courses/${courseId}`);
  return response.data;
};

export const getInstructorPerformance = async () => {
  const response = await publicApi.get("/admin/analytics/performance");
  return response.data;
};

export const getOverallAnalytics = async () => {
  const response = await publicApi.get("/admin/analytics/overall");
  return response.data;
};

export const getStudentActivity = async () => {
  const response = await publicApi.get("/admin/analytics/student-activity");
  return response.data;
};