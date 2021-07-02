const express = require("express")
const Sleep = require("../models/sleep")
const security = require("../middleware/security")
const router = express.Router()

router.get("/", security.requireAuthenticatedUser, async (req, res, next) => {
    try {
      const user = res.locals.user
      const sleep = await Sleep.listSleepForUser(user)
      return res.status(200).json({ sleep })
    } catch (err) {
      next(err)
    }
  })

router.get("/average", security.requireAuthenticatedUser, async (req, res, next) => {
  try {
    const user = res.locals.user
    const sleep = await Sleep.getAverageSleepUser(user)
    return res.status(200).json({ sleep })
  } catch (err) {
    next(err)
  }
})


router.post("/", security.requireAuthenticatedUser, async (req, res, next) => {
    try {
      const user = res.locals.user
      const sleep = await Sleep.createSleep({ user, sleep: req.body })
      return res.status(201).json({ sleep }) //excercise: excercise object
    } catch (err) {
      next(err)
    }
  })


  module.exports = router