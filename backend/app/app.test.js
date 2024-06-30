const request = require('supertest');
const app = require('./app');
const mongoose = require('mongoose');
const Chat = require('./modules/chats/chats.model');


jest.mock(Chat);
describe('GET /api/v1/messages/667ea6a7c6325dbd93d64fcb', () => {
    it('should retrieve chats successfully', async () => {
        const mockChatData = [
            {
                _id: new mongoose.Types.ObjectId(),
                room: new mongoose.Types.ObjectId(),
                user: { _id: new mongoose.Types.ObjectId(), name: 'John Doe' },
                message: 'Hello!',
            },
        ];

        Chat.find.mockImplementation(() => ({
            populate: jest.fn().mockResolvedValue(mockChatData),
        }));

        const roomId = '667ea6a7c6325dbd93d64fcb';

        const response = await request(app).get(`/api/v1/messages/${roomId}`);

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Chats retreived successfully');
        expect(response.body.data).toEqual(mockChatData);
    });

    // it('should respond with 401 if no token is provided', async () => {
    //     const response = await request(app).get('/api');
    //     expect(response.status).toBe(401);
    //     expect(response.body.message).toBe('No token provided');
    // });
});