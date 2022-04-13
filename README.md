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

The **frontend** uses Javascript, React v17, Formik, Yup, Reactstrap, and Bootstrap with Axios for API calls.   It handles Dashboard interaction for logged in users to add  properties to their liked/managed lists.  This then allows users to calculate profit from the categories entered.  
The front end uses cookies, validation, JWTs, API calls, React_Context, ReactStrap, and Bootstrap.  

The **backend** handles API calls to the reguru-APIand stores user data while using JWTs for authorization.   
The **API** is written in NodeJS/Express/MongoDB using Mongoose and stores all property data.  This is hosted seperately from the REGURU app.   
The **API** handles the real-estate database which where populated from real listings.  
These were converted to useable JSON with a custom Python app. 


## The code for the backend can be found at:

https://github.com/benochi/reguru-backend
