import React, { useEffect } from "react";
import { Col, Row } from "reactstrap";
import LikedPropertyCard from "./LikedPropertyCard"

function LikedPropertyList({likedProperties, setLikedProperties, handlePropertySearch, handleManagedPropertyAdd}) {
  
  useEffect(function getAllPropertiesOnMount() {
    handlePropertySearch();
  }, []); 

  if (!likedProperties) return <h2>Add some properties...</h2>;

  return (
    <Col xs="12" className="mx-auto text-white">
      {likedProperties.length ?
        <Row className="text-left">
        {likedProperties.map(({ _id, type, price, address, bedrooms, bathrooms, sqft }) => (
          <LikedPropertyCard
            key={ _id}
            id={_id}
            type={type}
            price={price}
            address={address}
            bedrooms={bedrooms}
            bathrooms= {bathrooms}
            sqft={sqft}
            setLikedProperties={setLikedProperties}
            likedProperties={likedProperties}
            handleManagedPropertyAdd={handleManagedPropertyAdd}
          />
        ))}
        </Row>
        : <h2>Waiting for properties...</h2>
        }
    </Col>
  )
}


export default LikedPropertyList