const express= require('express');
const api = require('../controller/waController');
const route = express.Router();

route.post('/api/sendmsg',api);

module.exports = route;
