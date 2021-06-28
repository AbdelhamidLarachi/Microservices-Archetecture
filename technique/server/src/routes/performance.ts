const express = require("express");
const Performance = require("../models/Performance");
const router = express.Router();
const os = require("os-utils");
import { Request, Response } from 'express';




//npm install --local os-utils
//return system stats as default



router.get("/", (req: Request, res: Response) => {
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



/* GET * Sys Performance
  optional param: type
  default: *
*/


router.get('/all', async (req: any, res: any) => {
  try {
    /* return * */
    res.json(await Performance.find().select("-_id"));
  } catch (err) {
    res.json(err);
  }
});




// LOG SERVER PERFORMACE


function pushPerformance() {

  new Performance({
    platform: "Technique",
    port: process.env.PORT,
    cPUs: os.cpuCount(),
    loadAverage5s: os.loadavg(5),
    totalMemoryMB: os.totalmem(),
    freeMemoryMB: os.freemem(),
    freeMemoryPercent: os.freememPercentage(),
    sysUptime: os.sysUptime()
    
  }).save()
    .then((performance: any) => {
      console.log(performance)
    })
    .catch((err: any) => {
      console.log(err)
    })
  }




// 1 hour delay
setInterval(pushPerformance, 1000 * 3600); 

module.exports = router;
