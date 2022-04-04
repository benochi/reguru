import axios from "axios";

const API_URL = "https://reguru-backend.herokuapp.com/" || "http://localhost:5000/"

class AuthUser {

  static token; 

  static async login(formData) {  
    return axios
      .post(API_URL + `auth/login`,
      { 
        username: formData.username,
        password: formData.password
      }).then(response => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data))
        }
        
        return response.data
      });
  }

  static async logout() {
    localStorage.removeItem("user")
  }

  static async register(formData) {
    return axios
      .post(API_URL + `auth/register`,
      { 
        username: formData.username,
        email: formData.email,
        password: formData.password
      }).then(response => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data))
        }
        return response.data
      });
  }

  //returns user and currently stored property ids. 
  static async getCurrentUser(username) {
    let res = await axios.get(API_URL + `user/${username}`)
    return res.data
  }
  
}
export default AuthUser;