const express = require('express');
const router = express.Router();

const refreshToken = require("./handler/refresh-tokens")

router.post('/', refreshToken.create);
router.get('/', refreshToken.getToken);

module.exports = router;
