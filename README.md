# Backend

API reference
Deployed on Heroku: https://water-my-plants-backend-vw.herokuapp.com/

Auth
Endpoint	| Method	| Body	| Description
----------|---------|-------|------------
/register	| POST	| { username , password , phoneNumber }	| Sign up a new user
/login	| POST	| { username , password }	| Log in an existing user


Users
Endpoint	| Method |	Body	| Description
----------|--------|--------|------------
/users	| GET |	    | Returns all users
/user	| GET |   |	Returns the logged in user
/user |	PUT |	{ username , password, phoneNumber }	| Returns the new user
/user | DELETE |    | Deletes the user


Plants
Endpoints	| Method |	Body	| Description
----------|--------|--------|------------
/user/plants	| GET |  |	Returns all single plants
/user/:plant_id	| GET |   |	Returns a single plant
/user/	| POST | { nickname, species, h2oFrequency, image_url } | Creates a new plant
/user/:plant_id | PUT | { nickname, species, h2oFrequency, image_url } | Updates plant
/user/:plant_id | DELETE |  | Deletes plant
