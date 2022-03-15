import React, {useState} from "react";
import ResultCard from "./ResultCard";
import {Row} from "reactstrap";

function ResultCardList({
  properties,
  handleLikedPropertyAdd, 
  handleManagedPropertyAdd,
  managedProperties,
  likedProperties,
}) {

  return(
    <Row className="ResultCardList col-md-12">
      {properties.map(property => (
        <ResultCard
          key={ property._id}
          id={ property._id}
          type={ property.type}
          price={ property.price}
          address={ property.address}
          bedrooms={ property.bedrooms}
          bathrooms= { property.bathrooms}
          sqft={ property.sqft}
          handleLikedPropertyAdd={handleLikedPropertyAdd}
          handleManagedPropertyAdd={handleManagedPropertyAdd}
          likedProperties={likedProperties}
          managedProperties={managedProperties}
        />
      ))}
    </Row>
  );
}

export default ResultCardList;