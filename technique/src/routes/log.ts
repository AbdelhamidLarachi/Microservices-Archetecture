const express = require("express");
const Log = require("../models/Log");
const router = express.Router();

import { Request, Response } from 'express';
import { ILog } from "../models/Log";



// @type log
enum logType {
  connection,
  disconnection,
  download
}


// @type assertion as ILog
function isLog(o: any): o is ILog {
  return ((typeof (o.userid) == "number") && (typeof (o.agent) == "string") && (typeof (o.version) == "number"));
}


/* GET * LOGS
  optional param: type
  default: *
*/


router.get('/:type?', async (req: any, res: any) => {

  try {

    // using @Optional type
    if (typeof req.params.type != "undefined") {
      if (req.params.type in logType) {
        // @cast to enum
        const type : string = logType[req.params.type];
        // return only that type
        res.json(await Log.find({ type }));
      }
    } 

    else {
      /* return all by default */
      res.json(await Log.find().select("_id"));
    }

  } catch (err) {
    res.json(err);
  }
});





// GET LOGS BY USER
router.get('/all/:userid', async (req: any, res: any) => {
  try {
    const log = await Log.find({ id: req.params.userid });
    res.json(log);
  } catch (err) {
    res.json(err);
  }
});





// ADD LOG 
router.post('/add', async (req: Request<{}, {}, ILog>, res: any) => {

  try {

    if (isLog(req.body)) {
      console.log(req.body)
      new Log(req.body).save()
        .then((log: any) => {
          res.json({log});
        })
        .catch((err: any) => {
          console.log(err)
          res.json({err})
        })
    }

    else {
      res.json({
        error: "Can't cast object ILog",
        expects: Object.values(logType).filter(key => isNaN(Number(key)))
      })
    }

  } catch (err) {
    res.json({ err })
  }
}
);




module.exports = router;
