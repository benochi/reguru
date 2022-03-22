# Reguru - Real Estate Guru

This project is hosted at http://reguru.herokuapp.com/

## Local use:
It is **highly** recommended that you also download and run the reguru-backend.  
reguru-frontend:  
Download the zip -> extract -> cd reguru-main -> npm i -> npm start  

## Languages used:

The frontend is written in React v17.  
The app uses react-router-dom v6.  
Validation is completed using Formik and Yup.  
API calls are completed with Axios.  
Tests are written using the React-Testing-Library.  

## Login

testuser/test1234 is available for trying out the app. 

## Overall design of the app.

The **frontend** communicates to a NodeJS/Express/MongoDB Atlas backend for the user database using Axios.  
The **backend** handles API calls to the reguru-API which is written in NodeJS/Express/MongoDB.  
The **API** is written in NodeJS/Express/MongoDB using Mongoose.  
The **API** handles the real-estate database which where populated from real listings.  
These were converted to useable JSON with a custom Python app. 


## The code for the backend can be found at:

https://github.com/benochi/reguru-backend
