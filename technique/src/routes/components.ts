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
  lab
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
  grid
}



// @type assertion as IComponent
function isComponent(o: any): o is IComponent {
  return ((typeof (o.name) == "string") && (typeof (o.category) == "string") && (typeof (o.subCategory) == "string") 
  && (typeof (o.sourceCode) == "string") && (typeof (o.npm) == "string") && (typeof (o.jsLibrary) == "string"));
}



// DELETE Component 
router.delete('/delete', async (req: any, res: any) => {
  //Component.findByIdAndDelete((req.body.id), 
  Component.remove({ _id: "" },
    function (err: any, data: any) {
      if (err) {
        console.log(err);
      }
      else {
        res.send(data);
      }
    });
});



// ADD COMPONENT
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
