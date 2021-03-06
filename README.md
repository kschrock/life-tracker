
# Week 3 Assignment: Life Tracker

Submitted by: **Kordell Schrock**

Deployed Application: [Lifetracker Deployed Site](https://changeable-meat.surge.sh/)

## Application Features

### Core Features

- [X] **The Nav Bar:** Implement customized views for users who are logged in vs not logged in.
  - [X] If the user is logged in, it should display a **Sign Out** button. 
  - [X] If no user is logged in, it should display **Login** and **Register** buttons
  - [X] Display a logo on the far left side, and contain links to the individual detailed activity page. 
- [X] **The Landing Page:** Display a large hero image and a brief blurb on what this application is about
- [X] **Login Page:** A form that allows users to login with email and password.
- [X] **Registration Page:** A form that allows the user to sign up with their email, password, username, first name, and last name.
- [X] When a user first authenticates, they should be redirected to an authenticated view (i.e the detailed activity page). When they sign out, all frontend data should be reset.
- [X] Users have access to an overview Activity page that show one summary statistic about each of the 3 types of activity tracked.
- [X] The API should have a `security` middleware that only allows authenticated users to access resources and only allows users to access resources about themselves. 
- [X] Users should have the ability to track at least **1** types of activities (i.e Nutrition, Exercise, Sleep, etc.). Each activity should be tracked on separate pages.
- [X] Deployed website with Heroku & Surge. 

**Detailed Activity Page:**
- [X] The detailed activity page should display a feed of all previous tracked activities.
- [X] The detailed activity should contain a form to contain relevant information. (i.e if tracking nutrition this form allows the user to capture calories, timestamp, image, category, etc.) 
- [X] The activity tracked should be given a unique id for easy lookup.
  `TODO://` Add link to table schema in the link code below. Your file should end in `.sql` and show your schema for the detailed activities table. (???? Remove this paragraph after adding schema link)
  * [Table Schema](life-tracker-backend/life-tracker-schema.sql) 

### Stretch Features

Implement any of the following features to improve the application:
- [ ] Each model (`nutrition`, `exercise`, and `sleep`) should also implement a `fetchById` method that queries the database for a record by its id and only serves it to users who own that resource. Create a new dynamic route on the frontend that displays detail about a single record. For instance, `nutrition/detail/:id` should show a page with all the information about a single nutrition item.
- [ ] Provide a dropdown that allows users to filter activity based on a certain attribute of any activity item.
- [ ] Calculate aggregate statistics based on time periods - such as daily, weekly, monthly aggregates.
- [ ] Create a page that shows all other users that use the life tracker application and allow users to follow each other.

### Walkthrough Video

![](https://media.giphy.com/media/Ku0dpzfUIGzu5RT5ri/giphy.gif)
**Showing Security Token, every backend method requires token**

![](https://media.giphy.com/media/ZybjBVxhhmO3YkFGcF/giphy.gif)
**Main Page w/ main layout/functions**
**Login**
**Navbar**
**Activity, Excercise, Nutrition, Sleep**

![](https://media.giphy.com/media/uwhAbh2nB6ca6IB2re/giphy.gif)
**Register User**

![](https://media.giphy.com/media/coZLcv0Ig2yF3ODqDH/giphy.gif)
**Create Excercise**

![](https://media.giphy.com/media/HBUSz0cyWGcMStz9Mn/giphy.gif)
**Create Nutrition**

![](https://media.giphy.com/media/GwMnSq7qyZyq06yiFL/giphy.gif)
**Create Sleep**

![](https://media.giphy.com/media/MsV3b9P7e83FW59uPy/giphy.gif)
**Updated Activity and logout showing you must be logged in for data**


### Reflection

* Did the topics discussed in your labs prepare you to complete the assignment? Be specific, which features in your weekly assignment did you feel unprepared to complete?

I felt that the labs for testing and use context were not needed, but good to learn. I had to focus on the assigment, so I have to go back and rewatch those 2 labs to understand them. Otherwise, I did feel like all the previous labs were needed to understand in order to get this project done. I felt the most underprepared on fetching data, by this I mean when to update the states. I do understand how to make API calls, I just need to know more on when to update states.

* If you had more time, what would you have done differently? Would you have added additional features? Changed the way your project responded to a particular event, etc.
  
If I had one more time to go back, I would focus on how to change the usestate in a better modular way. I would also try to implement more of the Activty Strech Featuers, add and endpoint to get by ID and display by ID, and lastly I would implement allowing to filter by dates.

* Reflect on your project demo, what went well? Were there things that maybe didn't go as planned? Did you notice something that your peer did that you would like to try next time?

Overall, I think everything went well! Over the past few weeks, my coding skills for full-stack has been getting better immensly! My peer implemented useContext which is something I would liked have done. 

Using Matieral UI, I was able to create components really fast and style with CSS. 

### Open-source libraries used

- Add any links to open-source libraries used in your project.
- [Materail UI](https://material-ui.com/)

### Shout out
### Matt & Ellie for the great lectures/debugging!
### Talyor for her postive message during the week!
### Raahima, Tirumari, Paige for helping students debug!
