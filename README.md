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

password-reset-app/
├── client/ # React Frontend
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── api/
│ │ ├── App.js
│ │ └── index.js
│ └── package.json
├── server/ # Node Backend
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── utils/
│ ├── server.js
│ └── .env
├── .gitignore
├── README.md
└── package.json


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
EMAIL_USER=your_mailtrap_email
EMAIL_PASS=your_mailtrap_password
BASE_CLIENT_URL=http://localhost:3000

#Then start the backend:
npm run dev

##Setup Frontend
cd ../client
npm install
npm start
---

📝 License
This project is licensed under the MIT License.

❤️ Acknowledgements
- Node.js

- MongoDB Atlas

- Mailtrap

- React

- Bootstrap

