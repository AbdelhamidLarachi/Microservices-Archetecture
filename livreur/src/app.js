const express = require("express");
const Sensor = require("./models/sensor");
const app = express();
const router = express.Router();


app.post("/", (req, res) => {
  console.log(req.body)
  res.json({ msg: "livreur" });
});

app.post("/livreur", (req, res) => {
  res.json({ msg: "livreur from reverse proxy" });
});

app.post("/livreur/add", (req, res) => {
  console.log(req.body)
  res.json({ msg: "adding livreur" });
});


// GET ALL SENSORS
router.post('/all', async(req, res) => {
  try {
      const sensor = await Sensor.find().select("_id"); // exclude id
      res.json(sensor);
  } catch(err){
      res.json(err);
  }
});


// GET SIGNLE SENSOR

router.post('/find', async(req, res) => {
  try {
      const sensor = await Sensor.find({ id: req.body.id });
      res.json(sensor);
  } catch(err){
      res.json(err);
  }
});


// DELETE SENSOR 

router.delete('/delete', async(req, res) => {
  //Sensor.findByIdAndDelete((req.body.id), 
  Sensor.remove({id:4},     
  function(err, data) {
      if(err){
          console.log(err);
      }
      else{
          res.send(data);
      }
  });  
});

// ADD SENSOR 

router.post('/add', async(req, res) => {

  const sensor = new Sensor({
      id: req.body.id,
      type: req.body.type,
      datas: req.body.datas,
      metrics: req.body.metrics
  });

  sensor.save()
  .then(sensor=>{
      res.json(sensor);
  })
  .catch(err=>{
      console.log(err)
  })
});

module.exports = app;
