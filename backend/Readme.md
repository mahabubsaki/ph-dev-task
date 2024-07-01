# Project: PH-dev-task-backend

Collabrative coding app backend all API

## Pre-requisites

- Node.js
- MongoDB
- Redis (should run on port 6379)

### Setup

1. Clone the repository:

   ```sh
   git clone <repository_url>
   cd backend
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:

   ```env
   MONGODB_URI=<your-db-uri>
   PORT=3001
   JWT_SECRET=<your-jwt-secret>
   REDIS_URL_LOCAL=redis://127.0.0.1:6379
   REDIS_URL=<deployed redis url>
   ```

4. Start the backend server:
   ```sh
   npm run start
   `
   ```

## Environment Variables

| Variable Name     | Description                | Default Value                  |
| ----------------- | -------------------------- | ------------------------------ |
| `LOCAL_API_URL`   | The URL of the API         | `http://localhost:3001/api/v1` |
| `PORT`            | Port number for the server | `3001`                         |
| `MONGODB_URI`     | Database URI               | `<your-db-uri>`                |
| `JWT_SECRET`      | JWT Token Secret           | `<your-jwt-secret>`            |
| `REDIS_URL_LOCAL` | Local Redis Url            | `redis://127.0.0.1:6379`       |
| `REDIS_URL`       | Deployed Redis Url         | `<deployed redis url>`         |

# 📁 Collection: Auth

## End-point: Sign Up User

### Method: POST

> ```
> {{LOCAL_API_URL}}/auth/register
> ```

### Body (**raw**)

```json
{
  "username": "saki001",
  "email": "saki001@gmail.com",
  "password": "12345678"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Login User

### Method: POST

> ```
> {{LOCAL_API_URL}}/auth/login
> ```

### Body (**raw**)

```json
{
  "loginEmail": "saki001@gmail.com",
  "loginPassword": "12345678"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Me Route

### Method: GET

> ```
> {{LOCAL_API_URL}}/auth/me?id=667e4ecd2197bcb8942b629e
> ```

### Query Params

| Param | value                    |
| ----- | ------------------------ |
| id    | 667e4ecd2197bcb8942b629e |

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

# 📁 Collection: Project

## End-point: Create Project

### Method: POST

> ```
> {{LOCAL_API_URL}}/projects/create
> ```

### Body (**raw**)

```json
{
  "title": "Test name",
  "document": "",
  "user": "667e4ecd2197bcb8942b629e"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Create Feedback

### Method: POST

> ```
> {{LOCAL_API_URL}}/projects/feedback
> ```

### Body (**raw**)

```json
{
  "project": "667ea6a7c6325dbd93d64fcb",
  "feedback": "Good Code",
  "changeId": "668064c69ff6e0ddb33294cf",
  "user": "667e4ecd2197bcb8942b629e"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Feeedbacks By Id

### Method: GET

> ```
> {{LOCAL_API_URL}}/projects/feedbacks/668064c69ff6e0ddb33294cf?id=667e4ecd2197bcb8942b629e
> ```

### Query Params

| Param | value                    |
| ----- | ------------------------ |
| id    | 667e4ecd2197bcb8942b629e |

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Get Project List

### Method: GET

> ```
> {{LOCAL_API_URL}}/projects/list?id=667e4ecd2197bcb8942b629e
> ```

### Query Params

| Param | value                    |
| ----- | ------------------------ |
| id    | 667e4ecd2197bcb8942b629e |

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Specific Project

### Method: GET

> ```
> {{LOCAL_API_URL}}/projects/list/667ea6a7c6325dbd93d64fcb?id=667e4ecd2197bcb8942b629e
> ```

### Query Params

| Param | value                    |
| ----- | ------------------------ |
| id    | 667e4ecd2197bcb8942b629e |

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Update Project

### Method: PUT

> ```
> {{LOCAL_API_URL}}/projects/edit/667ea6a7c6325dbd93d64fcb
> ```

### Body (**raw**)

```json
{
  "title": "Hello1234(edited)2"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Delete Project

### Method: DELETE

> ```
> {{LOCAL_API_URL}}/projects/delete/668101c2ed68d15ee9f6c736
> ```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

# 📁 Collection: Chat

## End-point: Send Message To Room

### Method: POST

> ```
> {{LOCAL_API_URL}}/messages/send
> ```

### Body (**raw**)

```json
{
  "message": "Test",
  "user": "667e4ecd2197bcb8942b629e",
  "room": "667ea6a7c6325dbd93d64fcb"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Get Messages By Room Id

### Method: GET

> ```
> {{LOCAL_API_URL}}/messages/667ea6a7c6325dbd93d64fcb?id=667e4ecd2197bcb8942b629e
> ```

### Query Params

| Param | value                    |
| ----- | ------------------------ |
| id    | 667e4ecd2197bcb8942b629e |

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃
