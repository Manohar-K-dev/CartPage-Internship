# 🛒 Full Stack E-Commerce Cart (MERN)

A **Full Stack Shopping Cart Application** built using the **MERN Stack (MongoDB, Express, React, Node.js)** as part of the **Vibe Commerce Internship Assignment**.

This project demonstrates full e-commerce functionality — product listing, cart management, and mock checkout — connected via REST APIs with a responsive React frontend.

---
---

## 🧠 Features

### 🖥️ Frontend (React)
- Product grid displaying mock items
- Add / Remove items from cart
- Update quantity dynamically
- View total price in real-time
- Checkout form (Name, Email)
- Receipt modal with total & timestamp
- Fully responsive layout (mobile-friendly)

### ⚙️ Backend (Node.js + Express)
- RESTful API endpoints for products, cart, and checkout
- Handles add, remove, and fetch cart operations
- Generates mock checkout receipts
- MongoDB integration for data persistence

---

## 🧩 API Endpoints

| Method | Endpoint | Description |
|--------|-----------|--------------|
| GET | `/api/products` | Fetch all mock products |
| POST | `/api/cart` | Add item to cart `{ productId, qty }` |
| DELETE | `/api/cart/:id` | Remove item from cart |
| GET | `/api/cart` | Retrieve cart items + total |
| POST | `/api/checkout` | Mock checkout → returns receipt |

---

## 🗄️ Tech Stack

**Frontend:** React.js, Axios, React Router, Tailwind CSS  
**Backend:** Node.js, Express.js, MongoDB (Mongoose), JWT Authentication (jsonwebtoken)  
**Database:** MongoDB (local or Atlas)  
**Version Control:** Git + GitHub  

---

📦 Backend Setup

cd backend
npm install
npm start

Runs on: http://localhost:5000

---

💻 Frontend Setup

cd frontend
npm install
npm start

Runs on: http://localhost:3000

---

📸 Screenshots

<img width="625" height="810" alt="Screenshot 2025-11-08 140955" src="https://github.com/user-attachments/assets/0b12555f-1d52-46a9-ab7d-6f060d0968b9" />
<img width="419" height="697" alt="Screenshot 2025-11-08 141002" src="https://github.com/user-attachments/assets/d30aa174-4eff-45f6-a45d-b5f12589d896" />
<img width="1919" height="976" alt="Screenshot 2025-11-08 141035" src="https://github.com/user-attachments/assets/871374aa-778b-4eca-881b-f2ea8dafeeee" />
<img width="1917" height="962" alt="Screenshot 2025-11-08 141044" src="https://github.com/user-attachments/assets/553f523c-d692-4afd-80c7-c95d175dc839" />
<img width="1833" height="956" alt="Screenshot 2025-11-08 141056" src="https://github.com/user-attachments/assets/b5c72054-87e7-4ccf-a7de-7463f3fbdc90" />
<img width="1777" height="943" alt="Screenshot 2025-11-08 141121" src="https://github.com/user-attachments/assets/10e96e35-41cb-45f0-85ad-7998206dc259" />
<img width="567" height="461" alt="Screenshot 2025-11-08 141137" src="https://github.com/user-attachments/assets/ea10cefa-de47-4305-be3f-04f198df1e86" />
<img width="643" height="440" alt="Screenshot 2025-11-08 141145" src="https://github.com/user-attachments/assets/ec1f47eb-11b3-48db-bc3e-88e9d6d0aba9" />

---

💡 Bonus Implementations

✅ MongoDB persistence (cart saved by user)

✅ Proper error handling & validation

✅ Responsive design with Tailwind CSS

✅ Clean modular folder structure

---

💼 Other Major Projects by Me
🛍️ LUXE E-Commerce (Advanced MERN Project)

Live Site: https://luxe-ecommerce.onrender.com

Admin Panel: https://luxe-admin-fyo6.onrender.com

Credentials:
User ID: admin@luxe.com  
Password: admin@LUXE2025

Features:

Admin dashboard with analytics

Product management (CRUD)

Stripe payment integration

Responsive & modern UI

---

💬 Real-Time Chat Application

Live Demo: https://chat-com-xi.vercel.app

Built with MERN + Socket.io for instant messaging, user authentication, and dark/light mode theme.

---

🌦️ Other Projects

Explore my collection of projects like Weather App, QR Generator, and more on GitHub:
🔗 https://github.com/Manohar-K-dev

---

👨‍💻 About the Developer

👋 Manohar K
🎓 B.Sc. Computer Technology, Erode Arts and Science College (2022–2025)
💻 Passionate MERN Stack Developer specializing in interactive web applications and scalable backend systems.

📫 Email: manohar10102004@gmail.com

💼 LinkedIn: https://www.linkedin.com/in/manohar--k

🌐 Portfolio: https://manohar-portfolio.onrender.com

🐙 GitHub: https://github.com/Manohar-K-dev

---

🧾 License

This project is created for educational and screening purposes only — no commercial use or real payment integrations.

---


