import React, { useContext } from "react";
import UserContext from "../UserContext";
import PropertyUser from "../api/PropertyUser"
import { Container, Row, Col, Button } from "reactstrap";

function LikedPropertyCard({ id, type, price, address, bedrooms, bathrooms, sqft, likedProperties, setLikedProperties, handleManagedPropertyAdd}){
  const { currentUser } = useContext(UserContext);
  let number = numberWithCommas(price)

  async function removeLikedProperty(){
    const property_id = id;
    let arr = [...likedProperties]
    let filteredArr = arr.filter(property => property._id !== property_id)
    
    await PropertyUser.removeLikedProperty(currentUser, property_id)
    setLikedProperties([...filteredArr])
  }

  async function moveToManaged(){
    const property_id = id;
    handleManagedPropertyAdd(property_id)
    removeLikedProperty()
  }

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <Container className=" col-md-6 ">
      <Row>
        <Col xs={12} className="border border-white bg-black align-self">
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
            className="btn btn-danger font-weight-bold text-uppercase border border-white float-right align-center m-1"
            onClick={removeLikedProperty}
          >
          Delete
          </Button>
          <Button
            className="btn bg-white text-black font-weight-bold text-uppercase border border-white float-right align-center m-1"
            onClick={moveToManaged}
          >
          Add to managed
          </Button>
        </Col>
      </Row>
    </Container>
  )

}


export default LikedPropertyCard