const express = require("express");
const bodyParser = require('body-parser');
const router = express.Router();
const cors = require("cors")

router.use(express.json())
router.use(cors())

// Article Model
const Client = require("../models/Client")

// Create Client Account

router.post('/add', (req, res) => {

    
    const newClient = new Client({


        credential_id: req.body.credential_id,
        name: req.body.name,
        lastname: req.body.lastname,
        phone_number: req.body.phone_number,
        address: req.body.address,
    });
    try {
        newClient.save().then((item) => res.json(item));
    }
    catch (err) {
        res.json(err)
    }
})




// Update Client

router.put("/:id", (req, res) => {
    // client ID
    const client_id = req.params.id;
    const data = req.body;
    console.log(data, client_id)
    Client.findOne({_id: client_id}).then((doc) => {
      doc.name = data.name;
      doc.lastname = data.lastname;
      doc.phone_number = data.phone_number;
      doc.address = data.address;

      doc.save();
      res.status(200).json(doc);
    }).catch((err) => {
      res.stats(400).json(err)
    })
  });

// Delete Client

router.delete("/:id", (req, res) => {
    Client.findById(req.params.id)
      .then((item) => item.remove().then(() => res.json({ success: true })))
      .catch((err) => res.status(404).json({ success: false }));
  });

// router.delete('/:id', async (req, res) => {

//     try {

//         await Client.deleteOne({
//             _id: req.params.id
//         })

//         res.status(200).send("Data deleted")
//     } catch (error) {
//         res.json({
//             message: error
//         })
//     }
// })


// Show Account

router.get('/:id', async (req, res) => {

    Client.findById({ _id: req.params.id }).then((doc) => {
        res.send(doc)
    }).catch((err) => {
        console.log(err)
    })

})

module.exports = router;
