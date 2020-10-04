module.exports = {
	testing: {
		client: "sqlite3",
		useNullAsDefault: true,
		connection: {
			filename: "./data/auth.db3",
		},
		migrations: {
			directory: "./data/migrations",
		},
		seeds: {
			directory: "./data/seeds",
		},
		pool: {      
			afterCreate: (conn, done) => {             
				conn.run('PRAGMA foreign_keys = ON', done);  
			}
		},
	},
	development: {
		client: "sqlite3",
		useNullAsDefault: true,
		connection: {
			filename: "./data/auth.db3",
		},
		migrations: {
			directory: "./data/migrations",
		},
		seeds: {
			directory: "./data/seeds",
		},
		pool: {      
			afterCreate: (conn, done) => {             
				conn.run('PRAGMA foreign_keys = ON', done);  
			}
		},
	},
	production: {
		client: "pg",
		connection: process.env.PORT,
		migrations: {
			directory: "./data/migrations",
		},
		seeds: {
			directory: "./data/seeds",
		},
		pool: {      
			min: 2,      
			max: 10    
		}
	}
}