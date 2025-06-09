# 🔐 Password Reset App

A full-stack **user authentication** and **password reset** system built with **Node.js**, **Express**, **MongoDB**, and **React**. This app allows users to register, log in securely with JWT, reset their password via email, and view their profile after authentication.

---

## 🚀 Features

- 🔐 User Registration & Login (JWT Authentication)
- 📧 Forgot Password – Sends reset link via email (Mailtrap)
- 🔄 Secure Password Reset using token validation
- 👤 Authenticated User Profile page
- 🧪 REST API tested with Postman
- 🛡️ Secure password hashing using `bcryptjs`

---

## 🛠️ Tech Stack

| Category   | Tech                               |
|------------|------------------------------------|
| Backend    | Node.js, Express, MongoDB, Mongoose |
| Frontend   | React, React Router, Axios, Bootstrap |
| Auth       | JWT, bcryptjs                      |
| Email      | Nodemailer + Mailtrap (SMTP)       |
| Dev Tools  | Postman, dotenv, concurrently      |

---

## 📂 Folder Structure

```bash
password-reset-app/
├── client/                      # React frontend
│   ├── public/                 
│   └── src/
│       ├── api/                # Axios API service
│       ├── components/         # React components (Login, Register, ResetPassword, etc.)
│       ├── pages/              # Page components (Home, Profile, etc.)
│       ├── App.js
│       └── index.js
│
├── server/                     # Express backend
│   ├── controllers/            # Controller logic (login, register, reset, profile)
│   ├── middleware/             # Auth middleware (JWT token verification)
│   ├── models/                 # Mongoose models (User schema)
│   ├── routes/                 # API route handlers
│   ├── utils/                  # Mailer config (Mailtrap)
│   ├── .env                    # Environment variables
│   ├── server.js               # Main server entry
│   └── package.json
│
├── README.me

```
---

📝 License
This project is licensed under the MIT License.

❤️ Acknowledgements
- Node.js

- MongoDB Atlas

- Mailtrap - for test

- React

- Bootstrap
---
## 📊 Data
---

## API Endpoints 📮

| Method | Endpoint                    | Description                  | Access       | Response                           |
|--------|-----------------------------|------------------------------|--------------|------------------------------------|
| POST   | `/api/auth/register`        | Register New User            | 🌐 Public    | ✅ JWT token / ❌ Error           |
| POST   | `/api/auth/login`           | Login Existing User          | 🌐 Public    | ✅ Success / ❌ Error             |
| POST   | `/api/users/forgot-passwprd`| Forgot user password         | 🌐 Public    | ✅ Rest Url by email/ ❌ Error    |
| POST   | `/api/users/reset-passwprd` | Reset user password          | 🌐 Public    | ✅ Update New Password/ ❌ Error  |
| GET    | `/api/users/profile`        | Get User Profile using token | 🔐 Private   | 🔐 User Details / ❌ Error        |
---

## Configuration Settings

| Setting       | Description                                  | Default Value |
| :------------ | :------------------------------------------- | :------------ |
| `PORT`        | Port number for the client to listen on.     | `3000`        |
| `PORT`        | Port number for the server to listen on.     | `4000`        |
| `MONGO_URI`   | Connection string for the MongoDB database.  | `(required)`  |
| `JWT_SECRET`  | Secret key used for signing JWTs.            | `(required)`  |

## API Response Codes

| Status Code | Description           |
| :---------- | :-------------------- |
| `200 OK`    | Request successful.   |
| `201 Created` | Resource created.     |
| `400 Bad Request` | Invalid input.        |
| `401 Unauthorized` | Authentication failed. |
| `500 Internal Server Error` | Server encountered an error. |

--

## Deployed App 🚀

#### For Live Demo Click the Below Link ⬇️ <br/>

🌐 Live URL : [https://password-reset-app-server.onrender.com]

---

#### Explore the authApp endpoints using Postman ⬇️ <br/>

## 📬 Postman Collection

You can test all API endpoints using the Postman collection below:

🔗 [View in Postman] [https://loganathanc-7436853.postman.co/workspace/Loganathan-C's-Workspace~3f55cebb-894f-406b-8650-cd297ae5e97d/collection/44466576-3a505590-dea0-40c5-b71d-c846c2b9ca39?action=share&creator=44466576]



---


## 📦 Installation

###Clone the Repo

```bash
git clone https://github.com/your-username/password-reset-app.git
cd password-reset-app

##Setup Backend
cd server
npm install

Create a .env file inside /server:
PORT=4000
MONGO_URI=your_mongodb_connection_uri
JWT_SECRET=your_secret_key
EMAIL_USER=your_user_email
EMAIL_PASS=your_user_password
BASE_CLIENT_URL=http://localhost:3000

#Then start the backend:
npm run dev

##Setup Frontend
cd ../client
npm install
npm start
---
