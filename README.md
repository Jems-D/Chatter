# Chatter 🗨️

Chatter is a full-stack social media web application where users can interact by posting content, adding comments, and reacting with emojis. The app features role-based access with real-time functionalities and a clean, responsive interface.
Try it here [Chatter](https://chatter.teemotee.dev)
## ✨ Features

- 📝 Users can create posts, comment, and react with emojis
- 🔐 JWT-based authentication
- 👥 Role-based system: User, Moderator, Admin
  - **Moderators** can soft-delete inappropriate content
  - **Admins** can view real-time statistics and promote users
- 🔁 Real-time updates via SignalR
- 📊 Dashboard with dynamic charts and data visualizations
- 🌐 Versioned and rate-limited API

---

## 🧩 Tech Stack

### 📦 Frontend
- **React (TypeScript)**
- **Tailwind CSS** – for rapid styling
- **Shadcn UI** – component library
- **Axios** – for HTTP requests
- **React Router DOM** – client-side routing
- **TanStack React Query** – server state management
- **TanStack React Table** – data grid and table utilities
- **React Hook Form + Resolver + Yup** – forms and validation
- **Toastify** – notifications
- **Lucide Icons** – lightweight icon set
- **Nivo** – charts and graphs

### 🔧 Backend
- **ASP.NET Web API** – RESTful API
- **T-SQL / MS SQL Server** – database
- **Stored Procedures** - the backend was made fully with using SPs not ORM
- **Entity Framework Core** – ORM
- **SignalR** – for real-time messaging
- **API Versioning** – structured endpoint control
- **Rate Limiting** – request throttling for protection

---
