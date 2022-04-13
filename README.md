# Reguru - Real Estate Guru

Reguru allows users to track investment properties and add potential or managed properties to their dashboard.  This gives a simple overview to keep track of the features of multiple properties as you purchase/sell them.  It also tracks the base price vor quickly calculating profits. 

This project is hosted at http://reguru.herokuapp.com/

Please give heroku some time to load the page and the property API. 

## Local use:
It is **highly** recommended that you also download and run the reguru-backend.  
reguru-frontend:  
Download the zip -> extract -> cd reguru-main -> npm i -> npm start  
node test from root will run the tests.  

## Login

testuser/test1234 is available for trying out the app. 

## Overall design of the app.

The **frontend** uses Javascript, React v17, Formik, Yup, Reactstrap, and Bootstrap with Axios for API calls.   It handles Dashboard interaction for logged in users to add  properties to their liked or managed lists.  This then allows users to calculate profit from the managed properties list using other variables(taxes,expenses,owed) to generate a chart using Chart.js.  

The front utilizes cookies, validation, JWTs, API calls, React_Context, ReactStrap, and Bootstrap.  

The **backend** handles API calls to the reguru-API and handles user login/registration and JWT validation with the frontend.  User datais stored in MongoDB Atlas using mongoose.  The backend also communicates with the property API utilizing Axios, which is hosted seperately.   

The **API** is written in NodeJS/Express/MongoDB using Mongoose and stores all property data.  The property data is all real and was scraped using Octoparse into a CSV file.  The CSV was then converted to JSON using an external python application that I wrote as well. 

The **API** is hosted on MongoDB Atlas and utilizes Mongoose to retrieve data.   


## The code for the backend can be found at:

https://github.com/benochi/reguru-backend

##Testing

Node is required for testing.
Tests are stored in a folder called "tests" in the root folder. 
Reguru uses the react testing library for testing with v17.  From the root directory:  
npm i  
node test

##User flow

A user will land at the home page which gives a brief overview of the Application. 
From here a user can navigate to register or login.  
After login or registration the user will be redirected to their dashboard.  
The dashboard gives access to a property data column, a liked property column, a managed property column, and a search form.
### Property data:
This includes a form for entering taxes, expenses, and amount owed on the properties in the user's managed property list.  The value of properties is dynamic.  
Upon submitting the form a chart will appear that breaks down the categories and shows the user profit/equity in the properties so far.  
  
### Liked Properties
This is a column that allows you to track specific properties the user wants to save.  The user can also move these into the managed property column when the time is right. Properties can intially be added to both columns, so that users can make calculations on potential investment properties without losing track of them. If added from liked -> managed, the app will automatically remove the property from liked.

### Managed properties
This column allows tracking currently managed properties and dynamically updates the total value for the property data column.  Users can add managed properties from liked properties or from the search results directly. 

### Search Form
The search form allows a user to search properties using minimum price, maximum price, minimum bedrooms, minimum bathrooms, or minimum sqft.
Results are paginated and returned with quick add buttongs to move them into liked or managed property columns on the dashboard.  Users can search using as many or as few categories as they want.  
  
###Thank you for stopping by! 
