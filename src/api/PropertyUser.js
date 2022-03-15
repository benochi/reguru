import axios from "axios";

const API_URL = "https://reguru-backend.herokuapp.com/" || "http://localhost:5000/"

class PropertyUser {

  //POST request to add a propertyId to managed properties in DB
  //http://localhost:5000/user/bob1/managed?propertyId=61fc412401a62a6c71a95ec7
  static async addManagedProperty(username, propertyId){
    let res = await axios.post(API_URL + `user/${username}/managed?propertyId=${propertyId}`)
    return res.data
  }

  //POST request to add a propertyId to liked properties in DB
  //http://localhost:5000/user/bob1/liked?propertyId=61fc412401a62a6c71a95ec7
  static async addlikedProperty(username, propertyId){
    let res = await axios.post(API_URL + `user/${username}/liked?propertyId=${propertyId}`)
    return res.data
  }

  //handle delete properties 
  static async removeLikedProperty(username, propertyId){
    await axios.delete(API_URL + `user/${username}/remove/liked/${propertyId}`)
  }

  static async removeManagedProperty(username, propertyId){
    await axios.delete(API_URL + `user/${username}/remove/managed/${propertyId}`)
  }

  //GET request to search properties by ID
  static async getPropertyById(property_id) {
    let res = await axios.get(API_URL + `prop/properties/${property_id}`)
    return res.data
  }

  //GET property by pricerange.
  //http://localhost:5000/prop/properties/price/price?priceMin=1550000&priceMax=3000000
  static async getPropertyByPrice(minPrice, maxPrice) {
    let res = await axios.get(API_URL + `prop/properties/price/price?priceMin=${minPrice}&priceMax=${maxPrice}`)
    return res.data
  }

  //GET http://localhost:5000/prop/properties/query/query?priceMin=100000&priceMax=100000&bedrooms=1&bathrooms=1&sqft=0&limit=&page=1
  static async getPropertyByQuery(minPrice, maxPrice, bathrooms, bedrooms, sqft, limit, page) {
    let query = API_URL + `prop/properties/query/query?priceMin=${minPrice}&priceMax=${maxPrice}&bathrooms=${bathrooms}&bedrooms=${bedrooms}&sqft=${sqft}&limit=${limit}&page=${page}`;
    let res = await axios.get(query)
    return res.data
  }

}

export default PropertyUser;