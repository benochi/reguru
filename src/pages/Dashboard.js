import React, { useContext, useState, useEffect } from "react";
import UserContext from "../UserContext";
import "./Dashboard.css"
import PropertyUser from "../api/PropertyUser";
import AuthUser from "../api/AuthUser";
import { Container, Row, Col } from "reactstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import LikedPropertyList from "../propertyLists/LikedPropertyList";
import ManagedPropertyList from "../propertyLists/ManagedPropertyList";
import SearchProperties from "../propertyLists/SearchProperties";
import { useNavigate } from 'react-router-dom';
import PropertyData from "./PropertyData";
import PropertyDataForm from "../forms/PropertyDataForm";
//import jwtDecode from "jwt-decode";

function Dashboard(){
  const { currentUser } = useContext(UserContext);
  const [likedProperties, setLikedProperties] = useState([])
  const [managedProperties, setManagedProperties] = useState([])
  const [value, setValue] = useState({price: 0})
  const [metrics, setMetrics] = useState(false)

  const [propertyData, setPropertyData] = useState({
    price: '',
    owed: '',
    expenses: '',
    taxes: ''
  })
  const navigate = useNavigate();
  const displayPrice = numberWithCommas(value.price)

  useEffect(() => {
    getValue();
  }, [managedProperties]);

  useEffect(() =>{
  }, [propertyData])

  
  if(!currentUser){ 
    navigate("../login")
  }

  //on mount will load all liked properties for currentUser
  async function handlePropertySearch() {
    let arr=[]
    
    let user = await AuthUser.getCurrentUser(currentUser);
    let properties = user.liked_properties
    for(let x =0; x < properties.length; x++) {
      let property = await PropertyUser.getPropertyById(properties[x]);
      arr.push(property.data)
    }  
    setLikedProperties(arr)
  }

  //add to all requests. 
  /*let token = localStorage.getItem("reguru-token")
  console.log(jwtDecode(token).username)*/

  //for individual properties added
  async function handleLikedPropertySearch(property_id) {
    let property = await PropertyUser.getPropertyById(property_id);
    let tempArr = [...likedProperties, property.data]
    const uniqueId = getUnique(tempArr, '_id')
    setLikedProperties(uniqueId)
  }  
  

  async function handleLikedPropertyAdd(property_id) {
    if(currentUser){
      try {
        await PropertyUser.addlikedProperty(currentUser, property_id)
        handleLikedPropertySearch(property_id);
      } catch(error) {
        console.error(error)
      }
    }
  }

  //**Managed property functions */
  //On mount. 
  async function handleManagedPropertySearch() {
    let arr=[]
    let valueArr = []
    let user = await AuthUser.getCurrentUser(currentUser);
    let properties = user.managed_properties
    for(let x =0; x < properties.length; x++) {
      let property = await PropertyUser.getPropertyById(properties[x]);
      arr.push(property.data)
      valueArr.push(property.data.price)
    }
    const sum = valueArr.reduce((partialSum, a) => partialSum + a, 0)
    setManagedProperties(arr)
    setValue({price: sum})  
  }

  //single add functions
  async function handleManagedPropertySearchById(property_id) {
    let property = await PropertyUser.getPropertyById(property_id);
    let tempArr = [...managedProperties, property.data]
    const uniqueId = getUnique(tempArr, '_id')
    setManagedProperties(uniqueId)
  }

  async function handleManagedPropertyAdd(property_id) {
    if(currentUser){
      try {
        await PropertyUser.addManagedProperty(currentUser, property_id)
        handleManagedPropertySearchById(property_id);
      } catch(error) {
        console.error(error)
      }
    }
  }

  function getValue(){
    let valueArr = []
    for (let i = 0; i < managedProperties.length; i++){
      valueArr.push(managedProperties[i].price)
    }
    const sum = valueArr.reduce((partialSum, a) => partialSum + a, 0)
    setValue({price: sum})
  }

  //function to filter out duplicate properties from adding to state. 
  function getUnique(arr, index) {
    const unique = arr
      .map(e => e[index])
      // store the keys of the unique objects
      .map((e, i, final) => final.indexOf(e) === i && i)
      // eliminate the dead keys & store unique objects
      .filter(e => arr[e]).map(e => arr[e]);      
    return unique;
  }

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <div className="dashboard">
      <Container fluid className="">
        <Row>
          <Col xs="12" className=" mx-auto  text-white mt-2 rounded-lg">
            <h2> {currentUser}'s dashboard</h2>
          </Col>
        </Row>
        <Row className="p-1">
          <Col xs="4" >
            <Col xs="12" className="text-white mx-auto mt-2 col-md-12">
            <h3>Property metrics</h3>
              <PropertyData 
                propertyData={propertyData}
                metrics={metrics}
              />
              { managedProperties.length
                ? <Row className="bg-black text-white border border-white p-1 col-sm-12 mx-auto mt-2">
                  <p >Total price of properties: ${displayPrice}</p>
                  <PropertyDataForm 
                    value={value}
                    propertyData={propertyData}
                    setPropertyData={setPropertyData} 
                    setMetrics={setMetrics}
                  />
                  </Row>
                  : null}
            </Col>
          </Col>
          <Col xs="4">
            <Col xs="12" className="text-white mx-auto mt-2 col-md-12">
            <h3>Liked properties</h3>
              <LikedPropertyList
                handlePropertySearch={handlePropertySearch}
                likedProperties={likedProperties}
                setLikedProperties={setLikedProperties}
                handleManagedPropertyAdd={handleManagedPropertyAdd}
              />
            </Col>
            </Col>
          <Col xs="4">
            <Col xs="12" className="text-white mx-auto mt-2 col-md-12">
              <h3>Managed properties</h3>
              <ManagedPropertyList 
                handleManagedPropertySearch={handleManagedPropertySearch}
                managedProperties={managedProperties}
                setManagedProperties={setManagedProperties}
                getValue={getValue}
                value={value}
              />
              
            </Col>
          </Col>
        </Row>
      </Container>
      <Container fluid className="container-fluid bg-black mt-4 border border-white">
        <Row>
          <Col xs="12" className="p-1">
            <Col xs="12" className="mt-1">
              <SearchProperties 
                handleManagedPropertyAdd={handleManagedPropertyAdd} 
                handleLikedPropertyAdd={handleLikedPropertyAdd}
                likedProperties={likedProperties}
                managedProperties={managedProperties}
              />  
            </Col>
          </Col>
        </Row>
      </Container>
    </div>
  )
}




export default Dashboard;