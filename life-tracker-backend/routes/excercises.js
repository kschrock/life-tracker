const express = require("express")
const Excercise = require("../models/excercise")
const security = require("../middleware/security")
const router = express.Router()

router.get("/", security.requireAuthenticatedUser, async (req, res, next) => {
    try {
      const user = res.locals.user
      const excercises = await Excercise.listExcercisesForUser(user)
      return res.status(200).json({ excercises })
    } catch (err) {
      next(err)
    }
  })


router.post("/", security.requireAuthenticatedUser, async (req, res, next) => {
    try {
      const user = res.locals.user
      const excercise = await Excercise.createExcercise({ user, excercise: req.body })
      return res.status(201).json({ excercise }) //excercise: excercise object
    } catch (err) {
      next(err)
    }
  })


  module.exports = router