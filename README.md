# POS System Backend

A RESTful API backend for a Point of Sale (POS) system built with Node.js, Express.js, and MongoDB.

## 🚀 Features

* Product management
* Category management
* Order management
* Customer management
* Authentication with JWT
* Access Token & Refresh Token
* Password hashing with bcryptjs
* Google OAuth 2.0 authentication
* Cookie-based authentication support
* Image upload with Cloudinary
* Bakong KHQR payment integration
* MongoDB database
* Redis support if configured
* Swagger API documentation
* Request testing with Supertest
* Unit testing with Jest
* In-memory MongoDB for testing
* CORS configuration
* API endpoint listing

---

## 🛠️ Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

### Authentication & Security

* JSON Web Token (JWT)
* bcryptjs
* Cookie Parser
* CORS
* Passport
* Google OAuth 2.0

### Image Storage

* Multer
* Cloudinary
* multer-storage-cloudinary

### Payment

* Bakong KHQR

### API Documentation

* Swagger
* swagger-jsdoc
* swagger-ui-express
* express-list-endpoints

### Testing

* Jest
* Supertest
* MongoDB Memory Server

---

# 📦 Installation

## 1. Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/pos-system.git
```

Enter the project:

```bash
cd pos-system
```

---

## 2. Install Dependencies

Install production dependencies:

```bash
npm install express mongoose dotenv
```

```bash
npm install swagger-jsdoc swagger-ui-express
```

```bash
npm install multer cloudinary multer-storage-cloudinary
```

```bash
npm install bakong-khqr
```

```bash
npm install express-list-endpoints
```

```bash
npm install jsonwebtoken bcryptjs cookie-parser cors
```

```bash
npm install passport passport-google-oauth20
```

Install development dependencies:

```bash
npm install --save-dev jest supertest nodemon
```

```bash
npm install --save-dev mongodb-memory-server
```

> If `package.json` and `package-lock.json` are already included in the repository, you can simply run:

```bash
npm install
```

---

# ⚙️ Environment Variables

Create a `.env` file in the project root.

You can use `.env.example` as a template:

```bash
copy .env.example .env
```

Example:

```env
PORT=5000
MONGO_URI=

# Cloudinary
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Bakong
BAKONG_API_URL=
BAKONG_TOKEN=
BAKONG_ACCOUNT_ID=
BAKONG_MERCHANT_NAME=
BAKONG_CITY=

# JWT
JWT_ACCESS_SECRET=
JWT_REFRESH_SECRET=

ACCESS_TOKEN_EXPIRES=15m
REFRESH_TOKEN_EXPIRES=7d

# Google OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACK_URL=http://localhost:3000/api/auth/google/callback

# Session
SESSION_SECRET=
```

⚠️ **Never commit `.env` to GitHub.**

The `.env` file contains sensitive information such as:

* Database credentials
* Cloudinary credentials
* Bakong token
* JWT secrets
* Google OAuth credentials
* Session secret

Use `.env.example` for sharing the required environment variables.

---

# ▶️ Run the Project

## Development

If Nodemon is configured:

```bash
npm run dev
```

Or:

```bash
npx nodemon server.js
```

## Production

```bash
npm start
```

---

# 📚 Swagger API Documentation

After starting the server, open:

```text
http://localhost:5000/api-docs
```

Swagger provides an interactive interface for:

* Viewing API endpoints
* Request parameters
* Request body
* Authentication
* API responses
* Testing endpoints

---

# 🧪 Testing

Run all tests:

```bash
npm test
```

Run Jest directly:

```bash
npx jest
```

Run tests with coverage:

```bash
npm test -- --coverage
```

The project can use `mongodb-memory-server` to run tests with a temporary MongoDB database without affecting your development database.

---

# 📁 Project Structure

```text
pos-system/
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   └── app.js
│
├── tests/
│
├── .env
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── server.js
└── README.md
```

> Adjust the folders above to match your actual project structure.

---

# 🔐 Authentication

The API uses JWT authentication.

### Access Token

```text
ACCESS_TOKEN_EXPIRES=15m
```

Access tokens are short-lived to reduce security risk.

### Refresh Token

```text
REFRESH_TOKEN_EXPIRES=7d
```

Refresh tokens can be used to obtain a new access token after the access token expires.

---

# 🔑 Google Authentication

Google OAuth 2.0 is implemented using:

```text
passport
passport-google-oauth20
```

Callback URL:

```text
http://localhost:3000/api/auth/google/callback
```

Make sure this callback URL is configured in your Google OAuth application.

---

# 🖼️ Image Upload

Product or other images can be uploaded using:

```text
Multer
    ↓
Cloudinary
    ↓
Image URL
    ↓
MongoDB
```

Cloudinary credentials must be configured in `.env`.

---

# 💳 Bakong KHQR

The system supports Bakong KHQR payment integration.

Configuration:

```env
BAKONG_API_URL=
BAKONG_TOKEN=
BAKONG_ACCOUNT_ID=
BAKONG_MERCHANT_NAME=
BAKONG_CITY=
```

The actual credentials should only exist in the local/server `.env` file.

---

# 🗄️ Database

The application uses MongoDB through Mongoose.

Example local MongoDB connection:

```env
MONGO_URI=mongodb://localhost:27017/pos_db
```

---

# 🌐 API Example

Base URL:

```text
http://localhost:5000/api
```

Example endpoints:

```text
POST   /api/auth/login
POST   /api/auth/register
POST   /api/auth/refresh
POST   /api/auth/logout

GET    /api/products
POST   /api/products
GET    /api/products/:id
PUT    /api/products/:id
DELETE /api/products/:id

GET    /api/categories
POST   /api/categories

GET    /api/orders
POST   /api/orders
GET    /api/orders/:id
```

> These are example endpoints. Use your actual routes as the source of truth.

---

# 📜 Available Scripts

Recommended `package.json` scripts:

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "jest --runInBand",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

---

# 🔒 Git Security

The following files should not be committed:

```text
.env
node_modules/
dist/
coverage/
note/
```

The repository should contain:

```text
.env.example
.gitignore
README.md
package.json
package-lock.json
src/
tests/
```

---

# 👨‍💻 Development Workflow

```text
Developer
    │
    ▼
Write Code
    │
    ▼
Run API
    │
    ▼
Test with Swagger/Postman
    │
    ▼
Run Jest Tests
    │
    ▼
git add .
    │
    ▼
git commit
    │
    ▼
git push
    │
    ▼
GitHub
```

---

# 📌 Important

Before running the application, make sure:

* Node.js is installed
* MongoDB is running
* `.env` is configured
* Cloudinary credentials are configured if image upload is used
* Bakong credentials are configured if payment is used
* Google OAuth credentials are configured if Google Login is used

---

# 📄 License

This project is for educational and development purposes.
