const express = require("express")
const Nutrition = require("../models/nutrition")
const security = require("../middleware/security")
const router = express.Router()

router.get("/", security.requireAuthenticatedUser, async (req, res, next) => {
    try {
      const user = res.locals.user
      const nutrition = await Nutrition.listNutritionForUser(user)
      return res.status(200).json({ nutrition })
    } catch (err) {
      next(err)
    }
  })

  router.get("/average", security.requireAuthenticatedUser, async (req, res, next) => {
    try {
      const user = res.locals.user
      const nutrition = await Nutrition.getAverageDailyCalorie(user)
      return res.status(200).json({ nutrition })
    } catch (err) {
      next(err)
    }
  })


router.post("/", security.requireAuthenticatedUser, async (req, res, next) => {
    try {
      const user = res.locals.user
      const nutrition = await Nutrition.createNutrition({ user, nutrition: req.body })
      return res.status(201).json({ nutrition }) //excercise: excercise object
    } catch (err) {
      next(err)
    }
  })


  module.exports = router