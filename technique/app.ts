const express = require('express');
const app = express();
const mongoose = require('mongoose');
const log = require('./src/routes/log');
const component = require('./src/routes/component');
const cors = require('cors')
const os = require("os-utils");


import { Request, Response } from 'express';
require('dotenv/config');



app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());



app.use('/log', log);
app.use('/component', component);


//npm install --local os-utils
//return system stats as default

app.get("/technique", (req: Request, res: Response) => {
    res.json({ 
      platform: os.platform(), 
      cPUs: os.cpuCount(),
      loadAverage5s: os.loadavg(5),
      totalMemoryMB: os.totalmem(),
      freeMemoryMB: os.freemem(),
      freeMemoryPercent: os.freememPercentage(),
      sysUptime: os.sysUptime()
    });
  });


// CONNECT TO DB 
mongoose.connect(process.env.DB_TOKEN, { useNewUrlParser: true }, ()=> console.log('Connected to db..'));



// PORT LISTENING  
app.listen(process.env.PORT, () => console.log(`server is listening on ${process.env.PORT}`))
