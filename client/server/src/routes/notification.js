const express = require("express");
const router = express.Router();
const cors = require("cors")
const Notification = require("../models/Notification")


router.use(cors())
router.use(express.json())

router.get("/:id", (req, res) => {

    Notification.find({ target_id: req.params.id, seen: false }).then((response) => {
        res.send(response);
    }).catch((err) => {
        console.log(err)
    })
})

router.put("/:id", (req, res) => {
    Notification.updateMany({
        target_id: req.params.id
    }, {
        seen: true
    }).then((response) => {
        res.send("Data Updated")
    }).catch((err) => {
        console.log(err);
    })
})

module.exports = router;