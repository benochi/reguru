import React, {useState} from "react";
import PropertyUser from "../api/PropertyUser";
import ResultCardList from "../propertyLists/ResultCardList";
import { Container, FormGroup, Form, Label, Input, Col, Row, Button } from "reactstrap"

function SearchForm({
  handleLikedPropertyAdd, 
  handleManagedPropertyAdd,
  likedProperties,
  managedProperties
}){
  const [formData, setFormData] = useState({
    minPrice: '',
    maxPrice: '',
    bathrooms: '',
    bedrooms: '',
    sqft: ''
  });
  const [formErrors, setFormErrors] = useState([]);
  const [properties, setProperties] = useState([]);
  const [page, setPage] = useState(1)
  const [results, setResults] =useState(false)

  //handle initial search and reset pagecount for pagination. 
  async function handleSubmit(evt) {
    evt.preventDefault();    
    
    let minPrice = +formData.minPrice 
    let maxPrice = +formData.maxPrice 
    let bathrooms = +formData.bathrooms 
    let bedrooms = +formData.bedrooms 
    let sqft = +formData.sqft 
    let limit = +formData.limit || 10
    let pageNum = 1
    let validate = await searchValidate(minPrice, maxPrice, bedrooms, bathrooms, sqft)
    setPage(pageNum)
    
    if(validate == true){
      let result = await PropertyUser.getPropertyByQuery(minPrice, maxPrice, bathrooms, bedrooms, sqft, limit, pageNum);
      if (result.data) { 
        setProperties(result.data)
        if(result.data.length >= limit) setResults(true)
      } else {
        setFormErrors(result.errors);
      }
    }
  }

  //form validation
  async function searchValidate(min, max, bed, bath, sq) {
    if(min > max) {
      setFormErrors(["Minimum price can't be higher than maximum price."])
      return false;
    }
    if(min < 0 || max < 0 || bed < 0 || bath < 0 || sq < 0) {
      setFormErrors(["All entered values must be numbers greater than 0."])
      return false;
    }
    return true;
  }

  //Handle pagination with page state. 
  async function handlePagination(evt, page) {
    evt.preventDefault();
    let minPrice = +formData.minPrice || 1
    let maxPrice = +formData.maxPrice || 100000000
    let bathrooms = +formData.bathrooms || 0
    let bedrooms = +formData.bedrooms || 0
    let sqft = +formData.sqft || 1
    let limit = +formData.limit || 10
    let pageNum = page || 1
    let validate = await searchValidate(minPrice, maxPrice, bedrooms, bathrooms, sqft)
    
    if(validate == true){
      let result = await PropertyUser.getPropertyByQuery(minPrice, maxPrice, bathrooms, bedrooms, sqft, limit, pageNum);
      if (result.data) { 
        setProperties(result.data)
        if(result.data.length < limit) setResults(false)
        if(result.data.length >= limit) setResults(true)
      } else {
        setFormErrors(result.errors);
      }
    }
  }

  //Update form data
  function handleChange(evt) {
    evt.preventDefault()
    
    const { name, value } = evt.target;
    setFormData(l => ({ ...l, [name]: value }));
  }

  async function handlePageUp(evt) {
    if(page <= 20) {
      let increase = page + 1 
      setPage(increase)
      await handlePagination(evt, increase);
    }
  }

  async function handlePageDown(evt) {
    if(page > 1) {
      let decrease = page - 1 
      setPage(decrease)
      await handlePagination(evt, decrease);
    }
    
  }

  return (  
      <Container className="container-fluid col-lg-12">
        <Form onSubmit={handleSubmit}>
          <Row>
          <FormGroup row className="mb-2 mr-sm-2 mb-sm-0 col-lg-3">
            <Label for="minPrice" className="mr-sm-2">
              Minimum price:
            </Label>
            <Col sm={12}>
              <Input
                name="minPrice"
                pattern="[0-9]*"
                className="form-control"
                value={formData.minPrice}
                onChange={handleChange}
                autoComplete="minPrice"
                default="0"
                placeholder="0"
              />
              </Col>
          </FormGroup>
          <FormGroup row className="mb-2 mr-sm-2 mb-sm-0 col-lg-3">
            <Label>
              Maximum price:
            </Label>
            <Col sm={12}>
              <Input
                name="maxPrice"
                pattern="[0-9]*"
                className="form-control"
                value={formData.maxPrice}
                onChange={handleChange}
                autoComplete="maxPrice"
                placeholder="10000000"
              />
              </Col>
          </FormGroup>
          <FormGroup row className="mb-2 mr-sm-2 mb-sm-0 col-lg-2">
            <Label>
              Minimum bathrooms:
            </Label>
            <Col sm={12}>
            <Input 
              name="bathrooms"
              pattern="[0-9]*"
              className="form-control"
              value={formData.bathrooms}
              onChange={handleChange}
              autoComplete="bathrooms"
              placeholder="0"
            />
            </Col>
          </FormGroup>
          <FormGroup row className="mb-2 mr-sm-2 mb-sm-0 col-lg-2">
            <Label>
              Minimum bedrooms:
            </Label>
            <Col sm={12}>
            <Input 
              name="bedrooms"
              pattern="[0-9]*"
              className="form-control"
              value={formData.bedrooms}
              onChange={handleChange}
              autoComplete="bedrooms"
              placeholder="0"
            />
            </Col>
          </FormGroup>
          <FormGroup row className="mb-2 mr-sm-2 mb-sm-0 col-lg-2">
            <Label>
              Square footage:
            </Label>
            <Col sm={12}>
            <Input 
              name="sqft"
              pattern="[0-9]*"
              className="form-control"
              value={formData.sqft}
              onChange={handleChange}
              autoComplete="sqft"
              placeholder="0"
            />
            </Col>
          </FormGroup>            
            <div className="d-grid gap-2 mt-2 mb-2">
              <Button className="bg-primary mx-auto col-lg-6 text-white" size="md" onSubmit={handleSubmit} >
                Search
              </Button>
              { formErrors.length
                  ? <p className="text-danger"><small>{formErrors}</small></p>
                  : null}
            </div>
            <Col>
            {page > 1 ? 
              <div className="d-grid gap-2 mx-auto col-lg-6 mt-2 mb-2">
              <Button className="bg-primary text-white" size="md" onClick={handlePageDown} >
                Back
              </Button>
              </div>
              : <div></div>
            }
            </Col>
            <Col>{results ? 
              <div className="d-grid col-lg-6 mt-2 mb-2 mx-auto">
              <Button className="bg-primary text-white" size="md" onClick={handlePageUp} >
                More results
              </Button>
            </div>
              : <div></div>
            } 
            </Col>
          </Row>
        </Form>
        {page <= 20 && page > 1 ?
        <h2>Results page #{page} </h2> :
        <h2></h2>}
        {page === 21 ?
        <h2>End of list</h2> :
        <h2></h2>
        }
        <Row className="mx-auto col-lg-12">
        {properties.length
          ?  <ResultCardList
            properties={properties}
            handleLikedPropertyAdd={handleLikedPropertyAdd}
            handleManagedPropertyAdd={handleManagedPropertyAdd}
            likedProperties={likedProperties}
            managedProperties={managedProperties}
            />
          : <h2>No results.</h2> 
        }
        </Row>
        
      </Container>   

  )
}



export default SearchForm;