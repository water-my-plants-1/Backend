# Backend

API reference
Deployed on Heroku: https://bw-weightlifting-journal.herokuapp.com/

Auth
Endpoint	Method	Body	Description

/register	POST	{ username , password , phoneNumber }	Sign up a new user

/login	POST	{ email , password }	Log in an existing user

/logout	GET	    Logout an existing user

Users
Endpoint	Method	Body	Description

/user	GET	{ id_number }	Returns a single user (based on JWT), includes nested exercises and sets.

/user	PUT	{ username , password, phoneNumber }	Returns the new user

/users	GET	