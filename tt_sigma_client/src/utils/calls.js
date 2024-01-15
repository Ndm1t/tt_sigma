import axios from "axios";
//Initializing axios instance with the server baseUri
const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/",
});
/*Object Calls contains all the requests we need to be called to server
* all the properties are functions that fetch or post data to the server*/
const Calls = {
  createUser: async (data) => await axiosInstance.post("users", data),

  listUsers: async () => {
    return await axiosInstance.get("users");
  },
  updateUser: async (data) => await axiosInstance.patch("users", data),
  deleteUser: async (userId) => await axiosInstance.delete(`users/${userId}`),
};

export default Calls;
