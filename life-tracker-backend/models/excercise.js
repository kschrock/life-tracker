const { BadRequestError } = require("../utils/errors")
const db = require("../db")

class Excercise {

    static async listExcercisesForUser(user) {
        const query = `
          SELECT excercises.id AS "excerciseId",
                 excercises.name AS "name",
                 excercises.category AS "category",
                 excercises.duration AS "duration",
                 excercises.intensity AS "intensity",
                 excercises.timestamp AS "postedAt"
          FROM excercises
            JOIN users ON users.id = excercises.user_id
          WHERE excercises.user_id = (SELECT id FROM users WHERE email = $1)
        `
        const result = await db.query(query, [user.email])
    
        return result.rows
      }

      static async getTotalExcerciseUser(user) {
        const query = `
          SELECT SUM (excercises.duration) as "total_time"
          FROM excercises
            JOIN users ON users.id = excercises.user_id
          WHERE excercises.user_id = (SELECT id FROM users WHERE email = $1)
        `
        const result = await db.query(query, [user.email])
    
        return result.rows
      }

    static async fetchExcerciseById(excerciseId) {
        const result = await db.query(
          `
          SELECT excercises.id AS "excerciseId",
                 excercises.name AS "name",
                 excercises.category AS "category",
                 excercises.duration AS "duration",
                 excercises.intensity AS "intensity",
                 excercises.timestamp AS "postedAt"
          FROM excercises
          WHERE excercises.id = $1
        `,
          [excerciseId]
        )
    
        return result.rows
      }

    
      static async createExcercise({ excercise, user }) {
        // if (!excercise || !Object.keys(excercise).length) {
        //   throw new BadRequestError("No excercise info provided")
        // }
        if (!user) {
          throw new BadRequestError("No user provided")
        }
        const requiredFields = ["name", "category", "duration", "intensity"]
        requiredFields.forEach(field =>{
            if(!excercise.hasOwnProperty(field)){
                throw new BadRequestError(`Required field - ${field} - missing from request body.`)
            }
        })

        // create a new excercise to user

        // name        TEXT NOT NULL,
        // category    TEXT,
        // duration    INTEGER,
        // intensity   INTEGER,
        // user_id     INTEGER REFERENCES users(id) ON DELETE CASCADE,

        const orderResult = await db.query(
          `
          INSERT INTO excercises (name, category, duration, intensity, user_id) 
          VALUES ($1, $2, $3, $4, (SELECT id FROM users WHERE email = $5))
          RETURNING id,
                    name,
                    category,
                    duration,
                    intensity,
                    timestamp AS "updatedAt"
        `,
        [excercise.name, excercise.category, excercise.duration, excercise.intensity, user.email]
        )
        // get excerciseIdId
        const excerciseId = orderResult.rows[0].id
    
        return await Excercise.fetchExcerciseById(excerciseId)
      }

}

module.exports = Excercise
