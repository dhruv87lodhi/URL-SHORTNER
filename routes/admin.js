const express = require('express');
const urlModel = require('../models/url');

const router = express.Router();

router.get('/', async (req, res)=>{
    return res.send('Admin route')
});

router.get('/url', async (req, res)=>{
    if(!req.user) {
        return res.redirect('/login');
    }
    const allURLs = await urlModel.find({});
    return res.render('home', {urls : allURLs});
});

module.exports = router;