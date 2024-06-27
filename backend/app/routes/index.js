const express = require('express');
const router = express.Router();

const applicationRoutes = [

];

applicationRoutes.forEach(route => {
    router.use(route.path, route.controller);
});

module.exports = router;