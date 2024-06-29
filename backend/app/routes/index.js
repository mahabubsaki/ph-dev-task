const express = require('express');
const userRouter = require('../modules/users/users.route');
const projectRouter = require('../modules/projects/projects.route');
const { path } = require('../app');
const chatsRouter = require('../modules/chats/chats.route');
const router = express.Router();

const applicationRoutes = [
    {
        path: '/auth', controller: userRouter
    },
    {
        path: '/projects', controller: projectRouter
    },
    {
        path: '/messages', controller: chatsRouter
    }
];

applicationRoutes.forEach(route => {
    router.use(route.path, route.controller);
});

module.exports = router;