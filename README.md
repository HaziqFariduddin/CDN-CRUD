# CDN CRUD Project

This project is a simple CRUD application built using React, Node.js/Express, MongoDB Atlas Cloud, and Bootstrap for the UI part. The application is hosted on Heroku as containers for both the client and server. # This is for a technical interview question

You can view the live client application here: [https://cdncrudclient.herokuapp.com/](https://cdncrudclient.herokuapp.com/)

## Overview
The project demonstrates the creation of a REST API with Node.js/Express and MongoDB Atlas for the backend, and a responsive front-end built with React and Bootstrap. The application allows users to perform CRUD operations (Create, Read, Update, and Delete) on user data.

### Client
<pre>
The client has three components : AddUser, UserDataTable, and EditUser. AddUser lets users add new users, 
UserDataTable displays all users with their details, and EditUser allows users to modify or delete existing users. 
The application can be run either through the Docker Compose file or locally using npm start. 
Environment files are required for the client REACT_APP_API_URL 
</pre>

### Server
<pre>
The backend provides RESTful APIs for CRUD operations, which the frontend consumes to perform CRUD 
operations on the users.The User model is defined in the backend using Mongoose, including 
properties for username, email, phone number, skillsets, and hobbies. The backend routes are 
defined using Express and include endpoints for getting all users, getting a specific user 
by ID, creating a new user, updating an existing user, and deleting a user. The 
updateUserById and createUser functions check for conflicts with existing users with the 
same username, email, or phone number before creating or updating a user, and return an error 
message if a conflict exists. Environment files are required for the server  MONGO_URI 
</pre>

## Running the Project

### Using Docker

1. Clone the repository and navigate to the project directory.
2. Update the `docker-compose.yml` file with the appropriate environment variables:
   - For the backend, set the `MONGO_URI` to your MongoDB Atlas URI.
   - For the frontend, set the `REACT_APP_API_URL` to your API endpoint URL.
3. Run the following command to start the containers: `docker-compose up`.

### Running Locally

1. Clone the repository and navigate to the project directory.
2. Create a `.env` file in the `backend` folder with the following content:
<pre>
MONGO_URI=your_mongo_uri
</pre>

3. Create a `.env` file in the `frontend` folder with the following content:
<pre>
REACT_APP_API_URL=https://your-api-url.com
</pre>

4. Navigate to the `backend` folder and run `npm install` followed by `npm start`.
5. Navigate to the `frontend` folder and run `npm install` followed by `npm start`.

## Contributing

Feel free to submit issues, fork the repository, and create pull requests to contribute to the project.

## License

This project is open-source and available under the [MIT License](LICENSE).
This README file should provide an overview of your CDN CRUD project and instructions on how to run the project using Docker and locally. Make sure to adjust the content as needed and add any additional information that you think might be helpful for users of the project.
