const express = require('express');
const app = express();
const morgan = require("morgan");
const cors = require('cors')
const jwt = require('jsonwebtoken');
const sql = require("mssql");
const bcrypt = require('bcrypt');
const proxy = require('express-http-proxy');
const ip = require("ip");



import { NextFunction, Request, Response } from 'express';
require('dotenv/config');



app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use(morgan('dev')); /* HTTP request logger middleware */




// db config
const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: ip.address(), 
  database: process.env.DB_NAME,
  options: {
    // True for local dev / self-signed certification
    trustServerCertificate: true
  }
}



// @type role
enum role {
  client,
  restaurateur,
  livreur,
  technique,
  commercial,
  devtiers
}


// @Auth form 
interface IAuth {
  //timestamps?: Date;
  email: string;
  password: string;
  role: number;
  version?: number;
}



// server-sided email pattern check
function isValidEmail(email: string) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}


// server-sided password pattern check
function isValidPassword(password: string) {

  /*
  (?=.*\d)          // should contain at least one digit
  (?=.*[a-z])       // should contain at least one lower case
  (?=.*[A-Z])       // should contain at least one upper case
  [a-zA-Z0-9]{8,}   // should contain at least 8 from the mentioned characters
  */

  const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
  return re.test(String(password));
}



// @type assertion as IAuth
function isValidForm(user: any): user is IAuth {
  return (isValidEmail(user.email) && (isValidPassword(user.password) && (user.role in role)));
}


  /* 
  unique endpoint 
  catch * routes except for login and signup
  
  else 
  - verify jwt auth
  - handle request to proxy
  */



  app.all('*', (req: Request, res: Response, next: NextFunction) => {  
    
    if(req.url.includes('/login'))
      return login(req, res, next);
    
    if(req.url.includes('/signup'))
      return signup(req, res, next);

    next();

  }, verifyJWT, proxy(process.env.LOAD_BALENCER_URL));


  

  /* 
  Authorization header format
  Authorization: Bearer <access_token> 
  */


  
  function verifyJWT(req: any, res: Response, next: NextFunction) {

    if(req.url.includes('/user')) 
      return next();

    const bearerHeader = req.headers['authorization'];

    if(typeof bearerHeader != "undefined") {
      req.token = bearerHeader.split(' ')[1];

      // jwt auth
      jwt.verify(req.token, process.env.SECRET_KEY, (err: Error, auth?: any) => {
      
      if(err)
        res.sendStatus(401);

      next();
    }); 
  }
    
    // Unauthorized
    else
      res.sendStatus(401);
  }



  /* 
  Handle user login 
  return {role, token) on success
    else return 404/401
  */



  function login(req: any, res: Response, next: NextFunction) {


    // is undefined
    if(!((typeof (req.body.password) == "string") && (typeof (req.body.email) == "string")))
      res.status(401).json({err: "check inputs"});


    // connect to your database
    sql.connect(config, function (err: Error) {

      if (err) console.log(err);


      // create Request object
      var request = new sql.Request();
      request.input('email', req.body.email);
      

      // query to the database and get the records
      request.query("SELECT * FROM usr WHERE email = @email",
      

      function(err: Error, result: any){
        if (err) res.status(500).send()

        
        // exists
        if(result.rowsAffected[0] > 0) 
        {
          const user = result.recordset[0];

          // authorized ** return USER_ROLE **
          if(bcrypt.compareSync(req.body.password, user.password)){

            delete user.password;

            // return token & user
            jwt.sign({ user }, process.env.SECRET_KEY, { expiresIn: '24h' }, (err: Error, token: JsonWebKey) => {
              res.status(200).json({ user, token});
            });
          }

          else // unauthorized
            res.status(401).json({err: "unauthorized"})
        } 
        else // !exists
          res.status(404).json({err: "not found"})
       });
  });
  }


  /* 
  Handle user signup 
  return 201 on success
    else return server err 500
  */



  function signup(req: Request<{}, {}, IAuth>, res: Response, next: NextFunction) {

  // connect to your database
  sql.connect(config, function (err?: Error) {
  
    if (err) res.status(500).json(err);

    if(isValidForm(req.body)){

      // create Request object
      var request = new sql.Request();

      // convert role string to its enum index
      const user_role : string = role[req.body.role];

      // fill req inputs
      request.input('email', req.body.email);
      request.input('hash', bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)));
      request.input('role', user_role);

      // query to the database and get the records
      request.query("INSERT INTO usr(email, password, role) VALUES (@email, @hash, @role)",

      // internal error
      function(err?: Error){
        if (err) res.status(500).send();
        
        // inserted
        res.status(201).send();
      });
    }


    // bad request 400
    else {
      res.status(400).json({
        expects: {
          email: "string (required)",
          password: "string (required) at least one digit, one lower case, one upper case, 8 characters",
          role: Object.values(role).filter(key => isNaN(Number(key))) // iterate role enum props
      }});
    }
  });
}




// PORT LISTENING  
app.listen(process.env.PORT, () => console.log(`Running on ${process.env.PORT}..`));