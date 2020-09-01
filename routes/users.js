var express = require('express');
const controller = require('../controllers/user')
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});


router.post('/register', controller.createNewUser)
router.post('/login', controller.logUserIn)



module.exports = router;