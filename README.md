## Prerequisites

Make sure you have Docker and Docker Compose installed on your machine.

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Getting Started

To get started with the project, follow these steps:

1.  **Clone the repository**

    ```bash
    git clone https://github.com/mahabubsaki/ph-dev-task
    cd ph-dev-task
    ```

2.  **Create a `.env` file in the root (check .env.example file) directory and add the following environment variables:**

    ```env
    MONGODB_URI=<your-db-uri>
    BACKEND_PORT=3001
    JWT_SECRET=<your-jwt-secret>
    REDIS_URL_LOCAL=redis://
    REDIS_URL=<deployed redis url>
    API_URL=<deployed-backend-link>/api/v1
    LOCAL_API_URL=http://localhost:3001/api/v1
    NEXT_PUBLIC_API_URL=<deployed-backend-link>/api/v1
    NEXT_PUBLIC_LOCAL_API_URL=http://localhost:3001/api/v1
    JWT_SECRET=n3AGBjPX7Zyl
    JWT_EXPIRES_HOUR=12
    NEXT_PUBLIC_SOCKET_URL_LOCAL=http://localhost:3001
    NEXT_PUBLIC_SOCKET_URL=<deployed-backend-link>
    ```

3.  **Build & Run the Docker images**

    ```bash
    docker-compose up --build
    ```

4.  **Access the application**

        The frontend application will be running on `http://localhost:3000` and the backend application will be running on `http://localhost:3001`.
