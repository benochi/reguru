import React, { useState, useEffect } from "react";
import { Col, Button, Row } from "reactstrap";

function ResultCard({ 
  id, 
  type, 
  price, 
  address, 
  bedrooms, 
  bathrooms, 
  sqft, 
  handleLikedPropertyAdd, 
  handleManagedPropertyAdd,
  likedProperties,
  managedProperties
 }) {
  
  const [liked, setLiked] = useState(false)
  const [managed, setManaged] = useState(false)

  useEffect(function updateLikedStatus() {
    checkLiked(id);
    checkManaged(id);
  }, [likedProperties, managedProperties]);

  //like functions to add to DB and state prop(dashboard)
  async function handleLike(){
    for(let i = 0; i < likedProperties.length; i++){
      if (id === likedProperties[i]._id) return;
    }
    handleLikedPropertyAdd(id)
    checkLiked(id)
  }
  
  async function checkLiked(id){
    for(let i=0; i <likedProperties.length; i++){
      if(id === likedProperties[i]._id){
        setLiked(true)
        return
      }
    }
      setLiked(false)
  }

  //handle manage properties
  async function handleManage(){
    for(let i = 0; i < managedProperties.length; i++){
      if (id === managedProperties[i]._id) return;
    }
    handleManagedPropertyAdd(id)
    checkManaged(id)
  }
  
  async function checkManaged(id){
    for(let i=0; i <managedProperties.length; i++){
      if(id === managedProperties[i]._id){
        setManaged(true)
        return
      }
    }
      setManaged(false)
  }

  return (
    <Col className="ResultCard col-md-6">
      <div className="card text-left text-md-right d-flex ml-auto border border-white mt-1 p-1" key={id} id={id}>
        <h5>Type: {type}</h5>
        <p>
        Price: {price}<br/> 
        Address: {address}<br/>
        Bedrooms: {bedrooms}<br/>
        Bathrooms: {bathrooms}<br/>
        Square feet: {sqft}</p> 
      </div>
      <Row>
      {!liked ? 
        <Button 
          className="active col-md-5 m-2 ml-auto bg-primary mx-auto text-white" 
          size="md" 
          onClick={handleLike}
          style={{backgroundColor:"#00CBFE"}}
        >
          Add to liked properties
        </Button>
      : 
        <Button
          className="col-md-5 text-white text-center p-1 mx-auto border border-white disabled m-2"
          size="md" 
          style={{backgroundColor:"#00008b"}}
        >
         Property liked
        </Button>
        }
      {!managed ?
        
          <Button 
            className="col-md-5 bg-white m-2 mx-auto text-black"
            size="md" 
            onClick={handleManage}
          >
            Add to managed properties
          </Button>
        
      : 
        <Button
          className="col-md-5 text-white text-center p-1 mx-auto border border-white disabled m-2"
          size="md" 
          style={{backgroundColor:"#242526"}}
        >
          Property managed
        </Button>      
      }
      </Row>
    </Col>
  )
}

export default ResultCard;