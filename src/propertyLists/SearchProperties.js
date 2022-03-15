import React from "react";
import { Container, Row} from "reactstrap"
import SearchForm from "../forms/SearchForm"


function SearchProperties({ 
    handleLikedPropertyAdd,
    handleManagedPropertyAdd,
    likedProperties,
    managedProperties
  }){

return(
  <div className="">
    <Container fluid>
      <Row>
        <h3>Search for properties</h3>
        <SearchForm 
          handleLikedPropertyAdd={handleLikedPropertyAdd}
          handleManagedPropertyAdd={handleManagedPropertyAdd}
          likedProperties={likedProperties}
          managedProperties={managedProperties}
        />
      </Row>
    </Container>
  </div>
)

}

export default SearchProperties;