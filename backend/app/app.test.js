const request = require('supertest');
const app = require('./app');
const mongoose = require('mongoose');
require("dotenv").config();

beforeEach(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
});


describe("GET /messages/:roomId", () => {

    it("should login and return all chats on 667ea6a7c6325dbd93d64fcb room", async () => {
        const res = await request(app).get("/api/v1/messages/667ea6a7c6325dbd93d64fcb?id=667eb4621bb0aea20fb1cced").set('Cookie', 'eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjY2N2ViNDYyMWJiMGFlYTIwZmIxY2NlZCIsImV4cGlyZXNBdCI6IjIwMjQtMDctMDFUMDY6MDE6MzUuNDg1WiIsImVtYWlsIjoic2FraTFAZ21haWwuY29tIiwidXNlcm5hbWUiOiJzYWtpMDA4IiwiaWF0IjoxNzE5NzcwNDk1LCJleHAiOjE3MTk4MTM2OTV9.jbdhOWRSZeBA4OAwVvTVh0Gi8HgnfYZKXzm1bUlNJFw');
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.message).toBe('Chats retreived successfully');
        expect(res.body.data).toBeDefined();
        expect(res.body.data.length).toBeGreaterThan(0);
    });
});


describe("POST /login", () => {

    it("should login user", async () => {
        const res = await request(app).post("/api/v1/auth/login").send({
            loginEmail: "saki001@gmail.com",
            loginPassword: "12345678"
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.message).toBe('Login successful');
        expect(res.body.data).toBeDefined();
    }
    );
});


describe("POST /signup", () => {

    it("should not signup user because inputs not valid", async () => {
        const res = await request(app).post("/api/v1/auth/register").send({
            email: "",
            password: "",
            username: ""
        });
        expect(res.statusCode).toBe(400);
        expect(res.body.success).toBe(false);
        expect(res.body.message).toBe('Bad Request');
    }
    );
});


afterEach(async () => {
    await mongoose.connection.close();
});