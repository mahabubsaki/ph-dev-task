# Collabwrite

Collabwrite is a collaborative platform where users can manage projects, collaborate on documents in real-time, and provide feedback through discussions.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies](#technologies)
- [Installation and Setup](#installation-and-setup)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contact](#contact)

## Project Overview

This project aims to provide a platform for teams to collaborate on documents, share feedback, and discuss ideas in real-time. Users can create projects, add documents, and invite team members to collaborate on the documents. The platform also includes a feedback system where users can provide feedback on documents and engage in discussions with other team members.

## Technologies

The project is built using the following technologies:

- **Backend**:

  - Node.js
  - Express
  - MongoDB
  - Socket.IO
  - Mongoose
  - Zod
  - JWT for authentication
  - Jest and Supertest for testing
  - Redis for caching
  - Render for deployment

- **Frontend**:
  - React
  - Next.js
  - Tailwind CSS
  - JWT for authentication
  - Socket.IO Client
  - Monaco Code Editor
  - Framer Motion
  - Shadcn
  - Jest and React Testing Library for testing
  - Vercel for deployment

## Features

1. **Project Management**

   - CRUD operations for Projects.
   - Connect frontend React components to backend APIs.
   - Real-time project updates using Socket.IO.

2. **Document Collaboration and Real-Time Editing**

   - Add, edit, and delete documents within projects.
   - Real-time collaboration using a rich text editor and Socket.IO.
   - Preserved document History and version control.

3. **Feedback and Discussion**

   - Add and retrieve feedback for documents.
   - Real-time communication among team members using a discussion forum or chat system integrated with Socket.IO.
   - Real-time communication among team members using a discussion forum or chat system integrated with Socket.IO.

4. **Enhanced UI/UX**
   - Usable and aesthetically pleasing interface.

## Installation and Setup

### Backend Setup

Open backend folder and follow the readme file to get started with backend

### Frontend Setup

1. Clone the repository:

   ```sh
   git clone <repository_url>
   ```

2. Navigate to the frontend directory:

   ```sh
   cd frontend
   ```

3. Install dependencies:

   ```sh
   npm install
   ```

4. Create a `.env` file in the root directory and add the following environment variables:

   ```env
   API_URL=<deployed-backend-link>/api/v1
   LOCAL_API_URL=http://localhost:3001/api/v1
   NEXT_PUBLIC_API_URL=<deployed-backend-link>/api/v1
   NEXT_PUBLIC_LOCAL_API_URL=http://localhost:3001/api/v1
   JWT_SECRET=n3AGBjPX7Zyl
   JWT_EXPIRES_HOUR=12
   NEXT_PUBLIC_SOCKET_URL_LOCAL=http://localhost:3001
   NEXT_PUBLIC_SOCKET_URL=<deployed-backend-link>
   ```

5. Start the frontend server:
   ```sh
   npm run dev
   ```

## Environment Variables

Here is the table of environment variables used in the project:

| Variable                       | Description                   | Example                          |
| ------------------------------ | ----------------------------- | -------------------------------- |
| `API_URL`                      | Production API URL            | `<deployed-backend-link>/api/v1` |
| `LOCAL_API_URL`                | Local API URL                 | `http://localhost:3001/api/v1`   |
| `NEXT_PUBLIC_API_URL`          | Public Production API URL     | `<deployed-backend-link>/api/v1` |
| `NEXT_PUBLIC_LOCAL_API_URL`    | Public Local API URL          | `http://localhost:3001/api/v1`   |
| `JWT_SECRET`                   | JWT Secret for signing tokens | `n3AGBjPX7Zyl`                   |
| `JWT_EXPIRES_HOUR`             | JWT Expiration time in hours  | `12`                             |
| `NEXT_PUBLIC_SOCKET_URL_LOCAL` | Public Local Socket URL       | `http://localhost:3001`          |
| `NEXT_PUBLIC_SOCKET_URL`       | Public Production Socket URL  | `<deployed-backend-link>`        |

## Deployment

Deployed the backend and frontend to a hosting platform. The backend is deployed to Render, and the frontend is deployed to Vercel.

## Testing

Ensure comprehensive testing to identify and fix bugs. Run the tests using the following commands:

- For backend tests (for now 3 api tests done):

  ```sh
  npm run test
  ```

- For frontend tests (for now 1 component test done):
  ```sh
  npm run test
  ```

## Documentation

Refer to the and [Backend Documentation](../backend/Readme.md) for detailed information on the project structure and API endpoints.

## Contact

For any questions or inquiries, please contact [saki007.ph@gmail.com](mailto:saki007.ph@gmail.com).
