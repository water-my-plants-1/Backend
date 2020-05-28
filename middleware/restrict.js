const jwt = require("jsonwebtoken")

function restrict(role = "normal") {
	return async (req, res, next) => {
		const authError = {
			message: "Invalid credentials",
		}

		const { authorization } = req.headers;

		if (authorization) {
			jwt.verify(authorization, jwtSecret, (err, decodedToken) => {
				if (err) {
					res.status(401).json({ message: "Invalid Credentials" })
				} else {
					req.decodedToken = decodedToken;
					next;
				}
			});
		} else {
			res.status(400).json({ message: "No credentials provided" });
		}

		try {
			if (!req.session || !req.session.user) {
				return res.status(401).json(authError)
			}

			const token = req.cookies.token
			if (!token) {
				return res.status(401).json(authError)
			}

			jwt.verify(token, "secret key", (err, decodedPayload) => {
				if (err || decodedPayload.userRole !== role) {
					return res.status(401).json(authError)
				}

				req.token = decodedPayload
				next()
			})

		} catch(err) {
			next(err)
		}
	}
}

module.exports = restrict