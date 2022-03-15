import React, { useContext } from "react";
import UserContext from "../UserContext";
import PropertyUser from "../api/PropertyUser"
import { Col, Button } from "reactstrap";


function ManagedPropertyCard({ id, type, price, address, bedrooms, bathrooms, sqft, managedProperties, setManagedProperties}){
  const { currentUser } = useContext(UserContext);
  let number = numberWithCommas(price)

  async function removeManagedProperty(){
    const property_id = id;
    let arr = [...managedProperties]
    let filteredArr = arr.filter(property => property._id !== property_id)
    
    await PropertyUser.removeManagedProperty(currentUser, property_id)
    setManagedProperties([...filteredArr])
  }

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <Col className="ResultCard col-md-6 border border-white bg-black p-1">
      <div className="bg-black text-left ml-auto" key={id} id={id}>
        <h5 className=" ml-auto">Type: {type}</h5>
        <p className="ml-auto">
        Price: {number}<br/> 
        Address: {address}<br/>
        Bedrooms: {bedrooms}<br/>
        Bathrooms: {bathrooms}<br/>
        Square feet: {sqft}</p> 
      </div>  
      <Button
        className="btn btn-danger font-weight-bold text-uppercase border border-white float-right "
        onClick={removeManagedProperty}
      >
      Delete
      </Button>
    </Col>
  )

}


export default ManagedPropertyCard