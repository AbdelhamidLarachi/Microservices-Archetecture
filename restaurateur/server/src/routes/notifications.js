const express = require("express");
const router = express.Router();

// Notification Model
const Notification = require("../../src/models/Notification");

// @route GET api/Notifications
// @desc  GET ALL Notifications
// @access Public

router.get("/:id", (req, res) => {
  Notification.find({ target_id: req.params.id, seen: false }).then((items) =>
    res.json(items)
  );
});

router.get("/", (req, res) => {
  Notification.find().then((items) =>
    res.json(items)
  );
});

// @route POST api/Notifications
// @desc  Create an Notifications
// @access Public
router.post("/add", (req, res) => {
  const newNotification = new Notification({
    source_id: req.body.source_id,
    target_id: req.body.target_id,
    title: req.body.title,
    description: req.body.description,
    seen: false
  });
  newNotification
    .save()
    .then((item) => res.json({ Notification: item, success: true }))
    .catch((err) => res.json({ success: false, err }));
});


// @route PUT api/Notifications
// @desc  EDIT a specific Notification
// @access Public

router.put("/:id", (req, res) => {
    const restaurateur_id = req.params.id;
    const notifications = req.body
    try{
        notifications.map((notif) => {
            Notification.findOne({_id: notif._id, target_id: restaurateur_id}).then((doc) => {
                doc.seen = true;
                doc.save();
            })
        })
        res.status(200).json({success: true})
    }
    catch (error){
        res.status(400).json(error)
    }
});


module.exports = router;