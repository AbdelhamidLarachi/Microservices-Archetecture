import { IComponent } from "../models/Component";

const express = require("express");
const Component = require("../models/Component");
const router = express.Router();
import { Request, Response } from 'express';


// @type component category
enum componentCategory {
  layout,
  inputs,
  navigation,
  feedback,
  surfaces,
  dataDisplay,
  lab,
  alert
}



// @type component sub-category
enum componentSubCategory {
  dataGrid,
  button,
  buttonGroup,
  tooltip,
  table,
  list,
  dialog,
  stepper,
  link,
  switch,
  select,
  grid,
  textfeild,
  alert
}



// @type assertion as IComponent
function isComponent(o: any): o is IComponent {
  return ((typeof (o.name) == "string") && (typeof (o.category) == "string") && (typeof (o.subCategory) == "string") 
  && (typeof (o.sourceCode) == "string") && (typeof (o.npm) == "string"));
}



// @DELETE Component 
router.post('/delete', async (req: any, res: any) => {
  
  Component.deleteOne({ _id: req.body.id },
    function (err: any, data: any) {
      if (err) {
        console.log(err);
        // bad request
        res.status(400).send();
      }
      else {
        // deleted
        res.status(202).send();
      }
    });
});



// @FIND Component 
router.get('/all', async (req: any, res: any) => {
  try {
    /* return all by default */
    res.json(await Component.find());
  } catch (err) {
    res.json(err);
  }
});



// @ADD Component
router.post('/add', async (req: Request<{}, {}, IComponent>, res: any) => {

  try {
    
    if (isComponent(req.body)) {
      new Component(req.body).save()
        .then((component: any) => {
          res.json({component});
        })
        .catch((err: any) => {
          console.log(err)
          res.json({err})
        })
    }

    else {
      res.json({
        error: "Can't cast object IComponent",
        expects: {
          category: Object.values(componentCategory).filter(key => isNaN(Number(key))),
          subCategory: Object.values(componentSubCategory).filter(key => isNaN(Number(key))),
          sourceCode: "string (required)",
          npm: "string (required)",
          jsLibrary: "string (required)",
        }
      })
    }

  } catch (err) {
    res.json({ err })
  }
}
);

module.exports = router;
