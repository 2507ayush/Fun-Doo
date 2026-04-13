# 🚀 FunDoo Notes Application

A full-stack Notes Management Application built with modern technologies, focusing on scalability, performance, and clean architecture.

---

## 📌 Overview

FunDoo Notes is a feature-rich application that allows users to create, manage, and organize notes efficiently. It provides secure authentication, OTP-based password recovery, and a responsive UI for seamless user experience.

---

## 🛠️ Tech Stack

### 🔹 Frontend

* React.js
* Material UI (MUI)
* Axios

### 🔹 Backend

* Spring Boot
* RESTful APIs
* Layered Architecture (Controller → Service → Repository)

### 🔹 Database & Caching

* Relational Database (MySQL / H2)
* Redis (Caching Layer)

### 🔹 Messaging Queue

* RabbitMQ (Asynchronous Communication)

### 🔹 Authentication & Security

* JWT-based Authentication
* OTP Verification via Email (Spring Mail Sender)

---

## ✨ Features

* 🔐 User Registration & Login
* 📝 Create, Update, Delete Notes
* 📂 Organize Notes Efficiently
* 🔁 Forgot Password with OTP Verification
* ⚡ Fast Data Retrieval using Redis Caching
* 📩 Asynchronous Processing using RabbitMQ
* 📱 Responsive UI using Material UI

---

## 🏗️ System Architecture

The project follows a clean and scalable architecture:

```
Frontend (React + MUI)
        ↓
     Axios
        ↓
Backend (Spring Boot)
        ↓
-----------------------------
| Controller Layer          |
| Service Layer             |
| Repository Layer          |
-----------------------------
        ↓
Database + Redis Cache
        ↓
RabbitMQ (Async Messaging)
```

---

## 🔄 API Workflow

1. User interacts with frontend (React UI)
2. Axios sends HTTP requests to backend APIs
3. Controller handles request
4. Service layer processes business logic
5. Repository interacts with database
6. Redis caches frequently accessed data
7. RabbitMQ handles async tasks (like email sending)

---

## 📧 OTP Verification Flow

1. User clicks on "Forgot Password"
2. System generates OTP
3. OTP is sent via email using Spring Mail Sender
4. User verifies OTP
5. Password reset is allowed upon successful verification

---

## ⚙️ Installation & Setup

### Prerequisites

* Java 17+
* Node.js
* MySQL / H2
* Redis Server
* RabbitMQ Server

---

### 🔹 Backend Setup

```bash
# Clone the repository
git clone https://github.com/2507ayush/Fun-Doo

# Navigate to backend folder
cd backend

# Build the project
mvn clean install

# Run the application
mvn spring-boot:run
```

---

### 🔹 Frontend Setup

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Start the application
npm run dev
```

---

## ⚙️ Configuration

### Application Properties (Spring Boot)

Configure the following in `application.properties`:

```properties
# Database
spring.datasource.url=jdbc:mysql://localhost:3306/fundoo
spring.datasource.username=root
spring.datasource.password=your_password

# Redis
spring.redis.host=localhost
spring.redis.port=6379

# RabbitMQ
spring.rabbitmq.host=localhost
spring.rabbitmq.port=5672

# Mail Configuration
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=your_email
spring.mail.password=your_password
```

---

## 📂 Project Structure

```
FunDoo Notes
│
├── backend
│   ├── controller
│   ├── service
│   ├── repository
│   ├── dto
│   └── entity
│
├── frontend
│   ├── components
│   ├── pages
│   └── services
│
└── README.md
```

---

## 🚀 Future Enhancements

* 🔖 Labels & Tags for Notes
* ⏰ Reminder & Notification System
* 📎 File/Image Upload Support
* 🌐 Deployment (AWS / Docker)

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repository and submit a pull request.

---

## 📌 GitHub Repository

🔗 [https://github.com/2507ayush/Fun-Doo](https://github.com/2507ayush/Fun-Doo)

---

## 🙌 Acknowledgements

This project helped me gain hands-on experience in full-stack development, system design, and real-world application architecture.

---

## 📧 Contact

For any queries or collaboration:

* GitHub: [https://github.com/2507ayush](https://github.com/2507ayush)

---

⭐ If you like this project, don't forget to give it a star!
