# Task Management System

## Backend Setup

1. Navigate to the backend folder:

cd backend

2. Navigate to the backend folder:

npm install

3. Set up environment variables in .env:

DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
JWT_SECRET=your_jwt_secret
PORT=3001

4. Run Prisma migrations:

npx prisma migrate dev --name init

5. Start the backend server:

npm run dev


## FrontEnd Setup

1. Navigate to Frontend folder

cd task-managment-fronend

2. Install dependencies

npm instal

3. Start the frontend server

npm run dev