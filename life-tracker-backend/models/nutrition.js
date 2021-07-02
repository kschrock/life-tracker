const { BadRequestError } = require("../utils/errors")
const db = require("../db")

class Nutrition {

    static async listNutritionForUser(user) {
        const query = `
          SELECT nutrition.id AS "nutritionId",
                nutrition.name AS "name",
                nutrition.category AS "category",
                nutrition.quantity AS "quantity",
                nutrition.calories AS "calories",
                nutrition.image_url AS "image_url",
                nutrition.timestamp AS "postedAt"
          FROM nutrition
            JOIN users ON users.id = nutrition.user_id
          WHERE nutrition.user_id = (SELECT id FROM users WHERE email = $1)
        `
        const result = await db.query(query, [user.email])
    
        return result.rows
      }

    static async getAverageDailyCalorie(user) {
      const query = `
      SELECT AVG (nutrition.calories) AS "avg", timestamp::date AS "date"
        FROM nutrition
          JOIN users ON users.id = nutrition.user_id
        WHERE nutrition.user_id = (SELECT id FROM users WHERE email = $1)
        GROUP BY timestamp::date;
      `
      const result = await db.query(query, [user.email])
  
      return result.rows
    }

    static async fetchNutritionById(nutritionId) {
        const result = await db.query(
          `
          SELECT nutrition.id AS "nutritionId",
                nutrition.name AS "name",
                nutrition.category AS "category",
                nutrition.quantity AS "quantity",
                nutrition.calories AS "calories",
                nutrition.image_url AS "image_url",
                nutrition.timestamp AS "postedAt"
          FROM nutrition
          WHERE nutrition.id = $1
        `,
          [nutritionId]
        )
    
        return result.rows
      }

    
      static async createNutrition({ nutrition, user }) {
        // if (!excercise || !Object.keys(excercise).length) {
        //   throw new BadRequestError("No excercise info provided")
        // }
        if (!user) {
          throw new BadRequestError("No user provided")
        }
        const requiredFields = ["name", "category", "quantity", "calories", "image_url"]
        requiredFields.forEach(field =>{
            if(!nutrition.hasOwnProperty(field)){
                throw new BadRequestError(`Required field - ${field} - missing from request body.`)
            }
        })

        // create a new nutrition to user

        // id          SERIAL PRIMARY KEY,
        // name        TEXT NOT NULL,
        // category    TEXT,
        // quantity    INTEGER,
        // calories    INTEGER,
        // image_url   TEXT,
        // user_id     INTEGER REFERENCES users(id) ON DELETE CASCADE,
        // timestamp  TIMESTAMP NOT NULL DEFAULT NOW()

        const orderResult = await db.query(
          `
          INSERT INTO nutrition (name, category, quantity, calories, image_url, user_id) 
          VALUES ($1, $2, $3, $4, $5, (SELECT id FROM users WHERE email = $6))
          RETURNING id,
                    name,
                    category,
                    quantity,
                    calories,
                    image_url,
                    timestamp AS "updatedAt"
        `,
        [nutrition.name, nutrition.category, nutrition.quantity, nutrition.calories, nutrition.image_url, user.email]
        )
        // get nutritionId
        const nutritionId = orderResult.rows[0].id
    
        return await Nutrition.fetchNutritionById(nutritionId)
      }

}

module.exports = Nutrition
