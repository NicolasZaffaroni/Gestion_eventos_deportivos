const express = require("express");
const router = express.Router();
const {addEvent,getAll, getByid,updateEvent, deleteEvent,getUpcomingEvents,getEventsByDateRange,getEventsByType} = require("../../controllers/event.controllers")
const {checkToken,authorize } = require('../../middleware/auth')

router.post("/addEvent", addEvent);
router.get("/getall", getAll);
router.get("/getbyid/:id ",getByid);
router.put("/:id", checkToken, updateEvent);
router.delete("/:id", checkToken, authorize(["couch"]), deleteEvent);
router.get("/upcoming", getUpcomingEvents);
router.get("/date", getEventsByDateRange);
router.get("/", getEventsByType); 

module.exports = router;