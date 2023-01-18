import axios from "axios";

export const api = axios.create({
  baseURL: "http://192.168.1.67:3333",
});

export const settingApi = () => ({
  signin: async (name: string, pass: string) => {
    const response = await api.post("/user/login", { name, pass });
    return response.data;
  },

  signup: async (name: string, pass: string, Rpass: string) => {
    const response = await api.post("/user", { name, pass, Rpass });
    return response.data;
  },

  logout: async () => {
    return { status: false };
    const response = await api.post("/logout");
    return response.status;
  },

  loadTask: async (name: string) => {
    const query = {
      headers: {
        name,
      },
    };

    const response = await api.get(`/tasks`, query);
    return response.data;
  },

  createTask: async (description: string, detail: string, name: string) => {
    const response = await api.post("/tasks/", { description, detail, name });
    return response.data;
  },

  editTask: async (
    id: string,
    description: string,
    detail: string,
    name: string
  ) => {
    const response = await api.put(`/tasks/${id}`, {
      description,
      detail,
      name,
    });
    return response.data;
  },

  deletTask: async (id: string) => {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
  },
});
