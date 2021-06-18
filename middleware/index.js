const express = require('express');
const app = express();
const morgan = require("morgan");
const cors = require('cors')
const jwt = require('jsonwebtoken');
const sql = require("mssql");
const bcrypt = require('bcrypt');
const proxy = require('express-http-proxy');
require('dotenv/config');




app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use(morgan('dev')); /* HTTP request logger middleware */




// db config
const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.LOCAL_IP, 
  database: process.env.DB_NAME,
  options: {
    // True for local dev / self-signed certification
    trustServerCertificate: true
  }
}


  /* 
  unique endpoint 
  catch * routes except for login and signup
  
  else 
  - verify jwt auth
  - handle request to proxy
  */


  app.all('*', (req, res, next) => {  
    
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


  
  function verifyJWT(req, res, next) {

    if(req.url.includes('/user')) 
      return next();

    const bearerHeader = req.headers['authorization'];

    if(typeof bearerHeader != "undefined") {
      req.token = bearerHeader.split(' ')[1];

      // jwt auth
      jwt.verify(req.token, process.env.SECRET_KEY, (err, auth) => {
      
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


  function login(req, res, next) {

    // connect to your database
    sql.connect(config, function (err) {
    
      if (err) console.log(err);

      // create Request object
      var request = new sql.Request();
      request.input('email', req.body.email);
      
      // query to the database and get the records
      request.query("SELECT * FROM usr WHERE email = @email",
      
      function(err, result){
        if (err) console.log(err)

        // exists
        if(result.rowsAffected[0] > 0) 
        {
          const user = result.recordset[0];

          // authorized ** return USER_ROLE **
          if(bcrypt.compareSync(req.body.password, user.password)){

            delete user.password;

            // return token 
            jwt.sign({ user }, process.env.SECRET_KEY, { expiresIn: '24h' }, (err, token) => {
              res.status(200).json({ user : user, token});
            });
          }

          else // unauthorized
            res.status(401).send()
        } 
        else // !exists
          res.status(404).send();
       });
  });
  }


  /* 
  Handle user signup 
  return 201 on success
    else return server err 500
  */



  function signup(req, res, next) {

  // connect to your database
  sql.connect(config, function (err) {
  
    if (err) res.status(500).send();

      // create Request object
      var request = new sql.Request();

      request.input('email', req.body.email);
      request.input('hash', bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)));
      request.input('role', req.body.role);

      // query to the database and get the records
      request.query("INSERT INTO usr(email, password, role) VALUES (@email, @hash, @role)",

      function(err, result){
        if (err) res.status(500).send();
        
        // inserted
        res.status(201).send();
      });
  });
  }



// PORT LISTENING  
app.listen(process.env.PORT, () => console.log(`Running on ${process.env.PORT}..`));