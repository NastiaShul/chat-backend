# Backend Chat App
This is a backend chat application developed in TypeScript that includes features such as user registration, authentication, password recovery, adding rooms, updating and deleting own rooms, updating and deleting own profile, joining and leaving rooms, and chatting with other users.

## Prerequisites
- Node.js (v16.16.0npm)  
- npm (8.11.0)  

## Getting Started
1. Clone the repository  
`https://github.com/NastiaShul/chat-backend.git`  

2. Install dependencies
`npm install`

3. Create .env file in the root directory and set the following environment variables

PORT= port_number  
DB_LINK = your_mongodb_uri  
JWT_SECRET = your_jwt_secret  
USER = your_email_name  
EMAIL_USER = your_email_address  
EMAIL_PASS = your_email_pass  

4. Start the application  
`npm run build` 
`npm run start`  

## Endpoints 
The application includes the following endpoints:  

### User Endpoints  
- **POST** `/users/register` - Registers a new user
- **POST** `/users/login` - Logs in a user and returns an access token
- **POST** `/users/password-reset` - Sends a new password email to the user's registered email address
- **GET** `/users` - Gets all users
- **GET** `/users/:userId` - Gets user profile info
- **PATCH** `/users/:userId` - Updates the currently authenticated user's profile information
- **DELETE** `/users/:userId` - Deletes the currently authenticated user's account
- **POST** `/users/password-reset` - Reset password 

### Room Endpoints  
- **GET** `/rooms` - Retrieves a list of available rooms other users  
- **GET** `/rooms/own` - Retrieves a list of available own rooms  
- **GET** `/rooms/:roomId` - Retrieves room info 
- **POST** `/rooms` - Creates a new room
- **PATCH** `/rooms/:roomId` - Updates an existing room's information
- **DELETE** `/rooms/:roomId` - Deletes an existing room
- **GET** `/rooms/:roomId/messages` - Retrieves all messages in room


#### Deployed  
`https://chat-p33m.onrender.com/`
