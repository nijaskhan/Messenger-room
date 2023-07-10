const router = require('express').Router();
const {getMessages} = require('./controllers/controllers');

router.get('/getMessages', getMessages);

module.exports = router;