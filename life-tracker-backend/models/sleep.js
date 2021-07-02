const { BadRequestError } = require("../utils/errors")
const db = require("../db")

class Sleep {

    static async listSleepForUser(user) {
        const query = `
          SELECT sleep.id AS "sleepId",
            sleep.start_time AS "start_time",
            sleep.end_time AS "end_time",
            sleep.timestamp AS "postedAt"
          FROM sleep
            JOIN users ON users.id = sleep.user_id
          WHERE sleep.user_id = (SELECT id FROM users WHERE email = $1)
        `
        const result = await db.query(query, [user.email])
    
        return result.rows
      }

      static async getAverageSleepUser(user) {
        const query = `
          SELECT ROUND( CAST ( (AVG ( EXTRACT(EPOCH FROM (sleep.end_time - sleep.start_time)))) /3600 AS numeric)  , 2) as "avg_difference"
          FROM sleep
            JOIN users ON users.id = sleep.user_id
          WHERE sleep.user_id = (SELECT id FROM users WHERE email = $1)
        `
        const result = await db.query(query, [user.email])
    
        return result.rows
      }

    static async fetchSleepById(sleepId) {
        const result = await db.query(
          `
          SELECT sleep.id AS "sleepId",
                sleep.start_time AS "start_time",
                sleep.end_time AS "end_time",
                sleep.timestamp AS "postedAt"
          FROM sleep
          WHERE sleep.id = $1
        `,
          [sleepId]
        )
    
        return result.rows
      }

    
      static async createSleep({ sleep, user }) {
        // if (!excercise || !Object.keys(excercise).length) {
        //   throw new BadRequestError("No excercise info provided")
        // }
        if (!user) {
          throw new BadRequestError("No user provided")
        }
        const requiredFields = ["start_time", "end_time"]
        requiredFields.forEach(field =>{
            if(!sleep.hasOwnProperty(field)){
                throw new BadRequestError(`Required field - ${field} - missing from request body.`)
            }
        })

        // create a new sleep to user

        // id          SERIAL PRIMARY KEY,
        // start_time  TIMESTAMP NOT NULL,
        // end_time    TIMESTAMP NOT NULL,
        // user_id     INTEGER REFERENCES users(id) ON DELETE CASCADE,
        // timestamp  TIMESTAMP NOT NULL DEFAULT NOW()

        const orderResult = await db.query(
          `
          INSERT INTO sleep (start_time, end_time, user_id) 
          VALUES ($1, $2, (SELECT id FROM users WHERE email = $3))
          RETURNING id,
                    start_time,
                    end_time,
                    timestamp AS "updatedAt"
        `,
        [sleep.start_time, sleep.end_time, user.email]
        )
        // get sleepId
        const sleepId = orderResult.rows[0].id
    
        return await Sleep.fetchSleepById(sleepId)
      }

}

module.exports = Sleep
