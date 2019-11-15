# Connect-Four API
An api created to store player stats, host players and global chat, connect 4 games and game rooms, chat history, etc for the connect 4 game app!

- **Checkout the Front-end Source Code and Docs: https://github.com/NimSum/connect-four-fe**
- **View the app live at: https://nimsum.github.io/connect-four-fe/#/**

## Table of contents
* [Getting Started](#Getting-Started)
* [Documentation](#Docs)
  * [Login/Signup](#User-Authentication)
  * [Websocket - Listeners](#Websocket-Listeners)
  * [Websocket - Emitters](#Websocket-Emitters)
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
### Websocket-Listeners
  **Client Related:**
  
  | Type         | Description                                     |Required Payload | Possible Emitter Response |
  | ------------ | ------------------------------------------------|-----------------|--------------------------|
  | `connection` | Initiates client manager                        |  None           |       None               |
  | `disconnect` | When the connection is disconnected             |  None           |  `game rooms update`, `game rooms update`   |
  | `error`   |  When the connection is severed                   | None           |  `game rooms update`, `game rooms update`    |
  | `register client`| Register client in Game room manager        | Player Token(raw)| `send all game rooms`     |
  | `remove client`|  Removes client from Game room manager        |        None      |   `game rooms update`     |
  
  **World Chat:**
  
  | Type         | Description                                     |Required Payload | Possible Emitter Response |
  | ------------ | ------------------------------------------------|-----------------|--------------------------|
  | `join world chat`|     Add player to World Chat channel/room   |       None      |    `world chat update`   |
  | `leave world chat`|  Removes player inside the World Chat channel/room|  None    |  `world chat update`     | 
  | `broadcast to world chat`| Broadcasts a message to World Chat  | Message as a String|  `world chat update`    |
  | `get world chat players`|  Triggers an emitter to send players |  None          |   `send world chat players`  |
  
  **Game Rooms:**
  
  | Type         | Description                      |Required Payload | Possible Emitter Response |
  | ------------ | ---------------------------------|-----------------|--------------------------|
  | `create game room`| Creates a new game room    | ```{ name: <String>, password: <string> }``` | `game rooms update` |
  | `join game room`|  Joins a game room     |  ```{ roomId: <String>, password: <string> }``` |`game rooms update`, `active game update` |
  | `leave game room`|   Leaves a game room       |  None    | `game rooms update`, `active game update`  |
  
  **Active Game Room:**
  
  | Type         | Description                                     |Required Payload | Possible Emitter Response |
  | ------------ | ------------------------------------------------|-----------------|--------------------------|
  | `set player ready`| Sets player ready, starts game if both ready  | ```{ isReady: <boolean>, chipColor: <string> }```   |     `active game update`  |
  | `place player chip`| Places "chip" to connect 4 grid            | Column Number: 0-6  |  `active game update`      |
  | `send in game message`|  Sends an in game message             |  Message as a string  | `active game update`       |
  
---
### Websocket-Emitters
 #### `game rooms update`: Sends information regarding game rooms
  | Update Type  |Description                  |  Triggered by client emitters:           |
  | ------------ |---------------------------- |-------------------------------------------|
  |   "addRoom"   | Newly created room update | ```create game room```    |
 |   "updateRoom"  | Updates about certain rooms, usually the status/players    | ```join game room```, ```leave game room```      |
  |   "deleteRoom"   | A room has been deleted in the server |  ```leave game room```(when no-one is inside)  |
  
  ##### Payload information: 
   ```
    // ADD ROOM
    {
      roomId: string,
      players: Array<any>,
      name: string,
      hasPassword: boolean,
      status: string,
      updateType: 'addRoom',
    }
    
    // UPDATE ROOM
    {
      roomId: string,
      players: array,
      name: string,
      hasPassword: boolean,
      status: string,
      updateType: 'updateRoom',
    }
    
    // DELETE ROOM
    // when a room has no players, it will automatically emit room deletion updates
    {
      roomId: string,
      updateType: 'deleteRoom',
    }
   ```
 #### `send all game rooms`: Sends all game rooms
 
 ##### Payload information:
 ```
    // automatically triggered when client emits 'register client'
    // Sends an array of rooms
    [
     {
       roomId: string;
       players: array;
       name: string;
       hasPassword: boolean;
       status: string;
      },
      ...
    ]
   ```
   
 #### `active game update`: Sends current/active game updates that the client is in
   | Update Type  |Description                               |        Triggered by client emitters:           |
   | ------------ |------------------------------------------|-------------------------------------------------|
   |   "activeUpdate"| Updates during an active game(chip placement phase) | ```place player chip```, ```set player ready```(conditional)    |
   |   "inactiveUpdate" | Updates during in inactive game|```set player ready```, ```join game room```, ```leave game room```, ```place player chip```(game over)|
   |   "message"   | A new message has been created/send | ```send in game message``` |
   |   "notification"  | Server updates like player joining/leaving/first turn selection  | ```set player ready```, ```join game room```, ```leave game room```, ```place player chip```(game over)     |
   |   "gameOver"   | The game is over, a winner has been decided |  ```place player chip```(when chip slot connects 4) |
  
 ##### Payload information:
  ```
    // Active Update
     {
       type: 'activeUpdate',
       status: 'active',
       prevSlot: [1, 0, 1],
       currentPlayer: {<PLAYER OBJECT>},
      }
    
    // Inactive Update
    // triggered mostly by client '', '', '', or ''(game over)
     {
       type: 'activeUpdate',
       status: 'full',
       players: [ <{PLAYER OBJECT or null}>, <{PLAYER OBJECT or null}> ]
      }
      
    // Message Update
     {
        player_name: 'nimsum',
        timestamp: 1519211809934,
        message: 'Hi there, stranger',
        type: 'message'
      }  
      
    // Notification Update
    // triggered by client 
     {
        message: 'nimsum was selected to go first!',
        type: 'notification'
      } 
    
    // Game Over Update
     {
        winner: 'nimsum',
        type: 'gameOver'
      } 
   ```
   
 #### `socket has errored`: Sends websocket error
   | Update Type  |Description                               |        Triggered by client emitters:           |
   | ------------ |------------------------------------------|-------------------------------------------------|
   | "registration" | Error during client registration process | ```register client```                       |
   
   ##### Payload information:
   ```
   // Registration Error
    {
       type: 'registration', 
       error: 'Failed to register client'
    } 
   ``` 
   
 #### `world chat update`: Sends world chat information
   | Update Type  |Description                               |        Triggered by client emitters:           |
   | ------------ |------------------------------------------|-------------------------------------------------|
   |  "notification" | Updates during joining/leaving world chat | ```join world chat```, ```leave world chat```  |
   | "player" | A new player has joined | ```join world chat```  |
   | "player" - "delete" | A player has left | ```leave world chat```  |
   |  "message" | A user has sent a message to world chat | ```broadcast to world chat```  |

   
   ##### Payload information:
   ```
   // Player Object Props: 
   {
     player_name: <string>, 
     win_streak: <number>, 
     _id: <string>, 
     wins: <number>, 
     losses: <number>
   }
   
   // Notification (Join/Leave)
    {
       player_name: nimsum,
       message: `nimsum has joined the chat!`,
       type: 'notification'
    }
    
   // New Message
    {
       message: "Hello world!", 
       player_name: "nimsum", 
       timestamp: 1573842283605,
       type: "message"
    }
    
    // New Player
    { 
      type: 'player',
      player: {<PLAYER OBJECT>}
    }
    
    // Delete Player
    { 
      type: 'player',
      update_type: 'delete',
      player: {<PLAYER OBJECT>}
    }
   ```
   
 #### `send world chat players`: Sends all world chat players (Documentation in progress)
 ##### Payload information:
   ```
    // An array of Player Objects
    [
      {<PLAYER OBJECT>},
      {<PLAYER OBJECT>},
      {<PLAYER OBJECT>},
    ]
   ```
  
---
## Future Plans/Features
- Private Messaging
- Show user stats
- Add friends
- Room Invites
- Password Resetsd

---
## Project Emphasis
I created this app to challenge myself to learn new technologies such as Typescript, MongoDB, Socket.io and AWS. I gained a deeper understanding of using OOP principles in Node.js using Typescript which resulted in reduced complexity and better bug/error prevention. I also learned how to use AWS EC2 instances and to deploy the backend applications. 

### Back-end
- [x] TypeScript
- [x] Node.js/Express
- [x] Mocha
- [x] Socket.io
- [x] MongoDb
- [x] Mongoose
- [x] JWT Authentication
- [x] Express Middleware
- [x] AWS(EC2)
- [x] Bcrypt
