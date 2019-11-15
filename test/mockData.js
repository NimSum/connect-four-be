module.exports = {
	newPlayer: {
		player_name: "nimdimsum",
		email: "nim@sum.com",
		password: "nimdimsum",
		secret_one: "nim",
		secret_two: "sum"
	},
	incompleteSignup: {
		mail: "nim@sum.com",
		player_name: "nim"
	},
	incompleteSignupRes: {
		params_required: "player_name, email, password, secret_one, secret_two",
		error: "Missing: email, password, secret_one, secret_two"
	},
	validLogin: {
		email: "nim@sum.com",
		password: "nimdimsum"
	},
	invalidEmail: {
		email: "sum@nim.com",
		password: "nimdimsum"
	},
	invalidPassword: {
		email: "nim@sum.com",
		password: "nimsum"
	},
	invalidLoginParams: {
		email: "nim@sum.com"
	},
	invalidLoginParamsErr: {
		params_required: "email, password",
		error: "Missing: password"
	},
	invalidLoginError: {
		error: "Invalid login credentials"
	},
	validToken:
		"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwbGF5ZXJfbmFtZSI6Im5pbWRpbXN1bSIsIl9pZCI6IjVkYTBiMjJjNGM1YjM1NjMwMDM5MDgyNiIsImlhdCI6MTU3MjU3ODMzOH0.ICrbRZpLvfeapYDJlMlsqmx46Cs1onnOTO0ehWryd7c",
	invalidToken:
		"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwbGF5ZXJfbmFtZSI6Im5pbWRpbXN1bSIsImVtYWlsIjoibmltQHN1bS5jb20iLCJpYXQiOjE1NzA4MjY1Nzh9.O5oOD0OUjtZPSFjzp3fF1Z0Z9wVpjno9rAWrCq5RcGs",
	invalidTokenError: {
		message: "invalid signature",
		name: "JsonWebTokenError"
	},
	createdPlayer: {
		token:
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwbGF5ZXJfbmFtZSI6Im5pbWRpbXN1bSIsImVtYWlsIjoibmltQHN1bS5jb20iLCJpYXQiOjE1NzA4MjY1Nzh9.O5oOD0OUjtZPSFjzp3fF1Z0Z9wVpjno9rAWrCq5RcGk",
		player: {
			win_streak: 0,
			wins: 0,
			losses: 0,
			games_played: 0,
			friends: [],
			achievements: [],
			_id: "5da0b22c4c5b356300390826",
			player_name: "nimdimsum",
			email: "nim@sum.com",
			password: "$2b$10$9sWDrHJiM3nLK94qqi/jOe5i0FTmr0oXsWeEhTJMBnm.PvD21ICFa",
			secret_one: "nim",
			secret_two: "sum",
			game_history: [],
			created_at: "2019-10-11T16:47:40.770Z",
			updatedAt: "2019-10-11T16:47:40.770Z",
			__v: 0
		}
	}
};
