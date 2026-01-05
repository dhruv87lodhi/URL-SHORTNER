const express = require('express');
const { handleGenrateNewShortURL, handleGetVisitHistory } = require('../controllers/url');
const router = express.Router();

router.post('/', handleGenrateNewShortURL);

router.get('/:shortId', handleGetVisitHistory);

module.exports = router;