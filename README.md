# Backend README content
backend_readme = """# Real-Time Task Manager – Backend (NestJS)

This is the backend for the Real-Time Task Management System built with NestJS, TypeORM, and PostgreSQL. It includes user authentication, role-based access, and WebSocket support.

📦 Tech Stack
* NestJS (TypeScript)

* TypeORM (PostgreSQL)

* Passport JWT

* Socket.IO (WebSocket gateway)

* RESTful API

##  🛠️ Setup Instructions
### Clone the repository:

bash
Always show details

Copy
``` 
git clone https://github.com/your-username/task-backend.git
cd task-backend
```
Install dependencies:

```
npm install
```
## Configure Environment:

### Create a .env file:

```
PORT=3000
JWT_SECRET=supersecret
FRONTEND_URL=http://localhost:3001
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=yourpassword
DB_NAME=taskmanager

```

## Run the server:

```
npm run start:dev
```
 API will be available at http://localhost:3000

### 🧠 Features
* 🔐 JWT Auth (Register/Login)

* 👥 Role-Based Access (Admin can delete users)

* 📄 CRUD for Tasks

* 🌐 WebSocket gateway for real-time updates

* 🛡️ Global exception filters and guards

* 🧪 Auto-generated UUIDs for users/tasks


### ✨ WebSocket Events
* task:create

* task:update

* task:delete

🧪 Test Users
```
ahmad+1@example.com	supersecurepassword	user
ahmad+16@example.com	supersecurepassword	admin
```