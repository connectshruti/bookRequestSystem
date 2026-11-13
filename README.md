# BookHub 📚

A full-stack Online Book Request System that allows employees to explore books and submit requests, while admins manage the book catalogue and track requests.

## ✨ Features

- **Admin:** Login, add books, manage books and view employee requests.
- **Employee:** Browse books, search and filter by technology, submit book requests.
- **Technology-based filtering** for books and requests.
- **Database integration** for persistent storage.

## 🛠️ Tech Stack

- **Frontend:** React, Tailwind CSS, Axios, React Router
- **Backend:** Java, Spring Boot, REST APIs
- **Database:** MySQL 

## 🚀 Run Locally

**1. Clone the repository**

```bash
git clone YOUR_REPOSITORY_URL
cd BookHub
```

**2. Start the backend**

Configure your database in `application.properties`, then run:

```bash
cd backend
mvn spring-boot:run
```

**3. Start the frontend**

Open another terminal:

```bash
cd frontend
npm install
```

Create a `.env.development` file in the frontend root:

```env
VITE_API_URL=http://localhost:8080
```

Then run:

```bash
npm run dev
```

Open the URL displayed by Vite, usually `http://localhost:5173`.

---

**Developed by Shruti Sharma**
