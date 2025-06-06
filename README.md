# 👕 FOREVER – Full Stack Fashion E-Commerce Web App

**FOREVER** is a responsive, full-featured **e-commerce platform** built using the **MERN stack**. It supports **user authentication**, **product browsing**, **secure online payments**, and an **admin panel** for managing inventory and orders.

---

## 🚀 Features

- 🛍️ Browse products by category (Men, Women, Kids)
- 🔐 JWT-based login and signup for users
- 👨‍💼 Admin dashboard for adding/editing products
- 💳 Payment integration with **Razorpay** and **Stripe**
- 📦 Track orders with real-time order status
- 🔄 Add to cart, update quantities, and checkout
- 📱 Mobile-friendly UI with **Tailwind CSS**
- 🌐 Live deployed frontend and backend

---

## 🛠️ Tech Stack

**Frontend:**
- React.js
- Tailwind CSS
- Axios
- React Router DOM

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Razorpay & Stripe Payment Gateway
- Dotenv for environment configs

**Deployment:**
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

---

 (product page, checkout flow, admin panel, etc.)

---

## ⚙️ Local Setup Instructions

```bash
# 1. Clone the repo
git clone https://github.com/HIMANSHU9690/forever.git
cd forever

# 2. Install dependencies

# For frontend
cd client
npm install

# For backend
cd ../server
npm install

# 3. Create .env file inside /server directory
touch .env

#Folder Structure

forever/
├── client/               # React frontend
│   └── src/
│       ├── components/   # UI components
│       ├── pages/        # Routes (Home, Product, Admin, etc.)
│       ├── context/      # Global state
├── server/               # Node.js backend
│   ├── models/           # Mongoose schemas
│   ├── routes/           # API endpoints
│   ├── controllers/      # Logic layer
│   ├── middleware/       # Auth & error handling
│   └── .env              # Environment variables

#Future Improvements
Product reviews and ratings
Email confirmation & password reset
Delivery partner integration
Invoice PDF generation


