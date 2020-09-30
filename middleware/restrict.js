const jwt = require("jsonwebtoken")

function restrict(role = "normal") {
	return async (req, res, next) => {
		const authError = {
			message: "Invalid credentials",
		}

		try {
			const { authorization } = req.headers;

			if (authorization) {
				jwt.verify(authorization, "secret key", (err, decodedToken) => {
					if (err) {
						return res.status(401).json(authError)
					} else {
						req.decodedToken = decodedToken
						next()
					}
				})
			} else {
				res.status(400).json({ message: "No credentials provided" })
			}


		} catch (err) {
			next(err)
		}
	}
}

module.exports = restrict