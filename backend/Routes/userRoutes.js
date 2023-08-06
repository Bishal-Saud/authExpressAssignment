const express = require('express');
const {signUp, signIn, getUser} = require('../Controllers/userControllers.js');
 
const routerAuth = express.Router();
//Validator middleware 
const {signUpValidator} = require('../middleware/signupValidator.js');
const {loginValidator} = require('../middleware/loginValidator.js');
const {jwtAuth} = require('../middleware/jwtAuth.js');


routerAuth.post('/signup',signUpValidator,signUp);
routerAuth.post('/signin',loginValidator,signIn);
routerAuth.get('/',jwtAuth,getUser);

module.exports = routerAuth;