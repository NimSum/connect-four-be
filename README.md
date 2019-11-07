### Front End Repo: https://github.com/NimSum/connect-four-fe

# Connect-Four API
An api created to store player stats, host players and global chat, connect 4 games and game rooms, chat history, etc for the connect 4 game app!

#### [A Front-End app using this API](https://github.com/NimSum/connect-four-fe)

## Table of contents
* [Getting Started](#Getting-Started)
* [Documentation](#Docs)
  * [Login/Signup](#User-Authentication)
* [Project Emphasis](#Project-Emphasis)
* [Future Plans](#Future-Plans) 


## Getting Started
If you'd like to clone this repository to your own local machine, run the following command in your terminal:

```shell
git clone https://github.com/NimSum/connect-four-be
```

CD into the cloned folder, then run the following command to install dependencies:

```shell
npm install
```

To start up the app, run the following command in your terminal:

```bash
npm start
```

Then, go to `http://localhost:3000/` in your browser to check if the server is running.

---

## Docs

#### ROOT URL: `http://localhost:3000/`

### User-Authentication
   ##### Required Headers:
  - `Content-Type: application/json`
  
  | `Authorization`| `Bearer <User Token Here>`| (NOTE: Required for User validation for updating user information) 
  
--- 
   ### Signup
   ##### Method: `POST`
   ##### Path: `/api/v1/signup`
   ###### Required Params:
  | Type         | Description             |
  | ------------ | ------------            |
  | `player_name`| Your users username as a string |
  | `email`      | Your users email as a string |
  | `password`   | Your users password as a string |
  | `secret_one`   | Your users first secret as a string(used for password reset)|
  | `secret_two`   | Your users second secret as a string(used for password reset) |
  
  - EXAMPLE HAPPY RESPONSE:
###### NOTE: Successful account creation has a token attached to the response.  This example has a token that expires within 7 days of successful login
  ```json
  {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwbGF5ZXJfbmFtZSI6Im5pbWRpbXN1bSIsImVtYWlsIjoibmltQHN1bS5jb20iLCJpYXQiOjE1NzA3NDEzODIsImV4cCI6MTU3MTM0NjE4Mn0.8lyLIAhL52Yf7MU9JUT6XYOOi238jiJVksXjweKXuOc",
      "player": {
          "win_streak": 0,
          "wins": 0,
          "losses": 0,
          "games_played": 0,
          "friends": [],
          "achievements": [],
          "_id": "5d9f793bf27a3a181ffb9c87",
          "player_name": "nimdimsum",
          "email": "nim@sum.com",
          "password": "$2b$10$EyYwLAdCpuDWJkF3DfPQq.7iYv.dcxcZETaUherdTXFrT5Mx0pCHS",
          "secret_one": "nim",
          "secret_two": "sum",
          "created_at": "2019-10-10T18:32:27.149Z",
          "updatedAt": "2019-10-10T18:32:27.149Z",
          "__v": 0
      }
    }
  ```
  - EXAMPLE SAD RESPONSE:
  
  // The server responds with an invalid params message if the necessary data isn't provided
  ```json
  {
      "params_required": "player_name, email, password, secret_one, secret_two",
      "error": "Missing: secret_one, secret_two"
  }
  ```
 ---  
 ### Login
 ##### Method: `POST`
 ##### Path: `/api/v1/login`
 ##### Two ways of logging in:
  - Email/Password
  - JWT Token
 ###### NOTE: Please ensure you do not pass both password/login and authorization at the same time

 ###### Required Params for email Login:
| Type         |Description                  |
| ------------ |------------                 |
| `email`      |Your users email as a string |
| `password`   |Your users password as a string |


 ###### Required Header for JWT Token Login:
| `Authorization`| `Bearer <USER TOKEN>`|
  
 - EXAMPLE HAPPY RESPONSE:
    ###### NOTE: Successful logins has a token attached to the response.  This example has a token that expires within 7 days of successful login
  ```json
   {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwbGF5ZXJfbmFtZSI6Im5pbWRpbXN1bSIsImVtYWlsIjoibmltQHN1bS5jb20iLCJpYXQiOjE1NzA3NDEzODIsImV4cCI6MTU3MTM0NjE4Mn0.8lyLIAhL52Yf7MU9JUT6XYOOi238jiJVksXjweKXuOc",
      "player": {
          "win_streak": 0,
          "wins": 0,
          "losses": 0,
          "games_played": 0,
          "friends": [],
          "achievements": [],
          "_id": "5d9f793bf27a3a181ffb9c87",
          "player_name": "nimdimsum",
          "email": "nim@sum.com",
          "password": "$2b$10$EyYwLAdCpuDWJkF3DfPQq.7iYv.dcxcZETaUherdTXFrT5Mx0pCHS",
          "secret_one": "nim",
          "secret_two": "sum",
          "created_at": "2019-10-10T18:32:27.149Z",
          "updatedAt": "2019-10-10T18:32:27.149Z",
          "__v": 0
      }
    }
  ```

  - EXAMPLE SAD RESPONSE:
  ```
  // The server responds with an invalid login message if the username or password isn't in a valid format
  {
    "error": "Invalid login credentials"
  }
  ```
 --- 
 ### Anonymous Login
 ##### Method: `POST`
 ##### Path: `/api/v1/anonymous`

 ###### Required Params for anonymous Login:
| Type         |Description                  |
| ------------ |------------                 |
| `player_name`      |Your users player name as a string(must be 3-15 chars in length) |
  
 - EXAMPLE HAPPY RESPONSE:
   ```json
   {
    "token":   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwbGF5ZXJfbmFtZSI6Im5pc3VtIiwicGxheWVyX3R5cGUiOiJhbm9ueW1vdXMiLCJpYXQiOjE1NzMxNjU0NTIsImV4cCI6MTU3Mzc3MDI1Mn0.hXGyxb1U_H5PC0iLDuKV_Tqcbyefp8-uuL2M3hxP4oU"
    }
    ```
  
 - EXAMPLE SAD RESPONSE:
  ```json
  {
    "error": "Name must be 3-15 characters"
  }
  ```
  
---
## Future Plans

---
## Project Emphasis

- [x] Typexcript
- [x] Node.js/Express
- [x] MongoDB
- [x] Mongoose
- [x] JWT Authentication
- [x] Express Middleware
- [x] Bcrypt
- [ ] WebSockets
