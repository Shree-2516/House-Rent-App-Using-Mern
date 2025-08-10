House Rent App Backend (Server)
This folder contains the backend server for the House Rent App. It is built with Node.js, Express.js, and MongoDB.

Features
RESTful API: Provides endpoints for managing properties, users, and bookings.

User Authentication: Handles user registration, login, and authorization.

Database Integration: Uses Mongoose to interact with a MongoDB database.

Image Management: Integrates with ImageKit for handling property images.

How to Run the Server
1. Environment Setup
MongoDB Atlas: Set up a free cluster on MongoDB Atlas to get your connection URI.

Link: https://www.mongodb.com/cloud/atlas/register

ImageKit: Create an account on ImageKit to get your API keys.

Link: https://imagekit.io

2. Configuration (.env file)
In the root of this server folder, create a new file named .env. Add the following environment variables, replacing the placeholders with your actual keys:

PORT=5000
MONGO_URI=<Your MongoDB Connection String>
IMAGEKIT_PUBLIC_KEY=<Your ImageKit Public Key>
IMAGEKIT_PRIVATE_KEY=<Your ImageKit Private Key>
IMAGEKIT_URL_ENDPOINT=<Your ImageKit URL Endpoint>
3. Installation and Startup
Open a terminal and navigate to this server folder.

Install dependencies:



npm install
Run the server:



npm run server
The server will start running, typically on http://localhost:5000. Make sure the server is running before you start the client application.