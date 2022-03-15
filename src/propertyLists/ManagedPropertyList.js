import React, { useEffect } from "react";
import { Row, Col } from "reactstrap"
import ManagedPropertyCard from "./ManagedPropertyCard";

function ManagedPropertyList({managedProperties, setManagedProperties, handleManagedPropertySearch}) {
 
  useEffect(function getAllPropertiesOnMount() {
    handleManagedPropertySearch();
  }, []); 

  if (!managedProperties) return <h2>Add some properties...</h2>;

  return (
    <Col xs="12" className="mx-auto text-white">
      {managedProperties.length ?
        <Row className="text-left">
        {managedProperties.map(({ _id, type, price, address, bedrooms, bathrooms, sqft }) => (
          <ManagedPropertyCard
            key={ _id}
            id={_id}
            type={type}
            price={price}
            address={address}
            bedrooms={bedrooms}
            bathrooms= {bathrooms}
            sqft={sqft}
            setManagedProperties={setManagedProperties}
            managedProperties={managedProperties}
          />
        ))}
        </Row>
        : <h2>Waiting for properties...</h2>
        }
    </Col>
  )
}


export default ManagedPropertyList