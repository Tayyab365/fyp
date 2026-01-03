# ShopEase - Gaming Ecommerce Platform

A full-stack MERN ecommerce web application specializing in gaming products with integrated AI-powered chatbot assistance.

## 🎮 About The Project

ShopEase is a modern ecommerce platform built specifically for gaming enthusiasts, offering a wide range of gaming products including laptops, keyboards, mice, and accessories. The platform features role-based access control and includes an AI-powered chatbot accessible on every page for user assistance.

## ✨ Key Features

- **Product Management**: Browse, search, and filter gaming products
- **Shopping Cart**: Add, remove, and manage cart items with real-time updates
- **User Authentication**: Secure JWT-based authentication with email verification
- **Order System**: Complete checkout with multiple payment options (COD, EasyPaisa, JazzCash, Card)
- **Reviews & Ratings**: Users can rate and review products
- **Admin Dashboard**: Manage products, orders, and users
- **AI Chatbot**: Integrated AI assistant available on all pages
- **Theme Switcher**: Light/Dark mode support
- **Responsive Design**: Works seamlessly on all devices

## 🛠️ Built With

### Frontend

- React.js
- Tailwind CSS
- JavaScript (ES6+)

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

### Authentication & Security

- JWT (JSON Web Tokens)
- Bcrypt for password hashing
- Email verification system

### External Services

- AI API (ChatGPT) for chatbot
- Email service for verification

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. **Clone the repository**

git clone https://github.com/Tayyab365/fyp.git
cd fyp

2. **Install Backend Dependencies**

cd backend
npm install

3. **Install Frontend Dependencies**

cd frontend
npm install

4. **Configure Environment Variables**

Create a `.env` file in the backend directory:

env

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
EMAIL_SERVICE=your_email_service
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
AI_API_KEY=your_ai_api_key

5. **Run the Application**

Start MongoDB:

mongod

Start Backend Server:

cd backend
npm start

Start Frontend Server:

cd frontend
npm start

## 👥 User Roles

### Guest User

- Browse products and view details
- Add items to cart
- Use AI chatbot
- Must login to checkout

### Registered User

- All guest features
- Complete checkout and place orders
- Add product reviews
- View profile

### Admin

- All user features
- Manage products (add, edit, delete)
- Manage orders and update status
- Manage users (block, delete, change roles)
- Access admin dashboard

## 🤖 AI Chatbot Feature

- Available on all pages as a floating button
- Accessible to registered users and admin
- Answers general queries using AI
- Real-time responses

## 📱 Screenshots

<img width="1590" height="745" alt="home" src="https://github.com/user-attachments/assets/245267dc-ea48-4323-92cc-5e1b18c811ab" />
<img width="1590" height="745" alt="shop" src="https://github.com/user-attachments/assets/144bb69d-dcc5-400b-ad3a-161d4d770779" />
<img width="1590" height="745" alt="product-detail" src="https://github.com/user-attachments/assets/426003da-64a8-447f-a2fd-3924c4dd18d8" />
<img width="1590" height="745" alt="admin-dashboard" src="https://github.com/user-attachments/assets/c39aaa62-10cb-4f36-a8d9-e0bb3db3754b" />

## 🔮 Future Enhancements

- Order history for users
- Wishlist functionality
- Real payment gateway integration
- Order tracking system
- Email notifications
- Chat history storage

## 🤝 Contributing

Contributions are welcome! Feel free to submit a Pull Request.

## 👨‍💻 Author

**Your Name**

- GitHub: [@Tayyab365](https://github.com/Tayyab365)
- Email: mtayyab3409@gmail.com

## 🙏 Acknowledgments

- React.js
- Tailwind CSS
- MongoDB
- Express.js
- OpenAI

**Note**: This is a Final Year Project (FYP) built for educational purposes.
