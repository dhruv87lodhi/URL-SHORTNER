const express = require('express');
const urlModel = require('../models/url');
const { handleRedirectToURL } = require('../controllers/static')

const router = express.Router();

router.get('/', async (req, res)=>{
    if(!req.user) {
        return res.redirect('/login');
    }
    const allURLs = await urlModel.find({createdBy : req.user._id});
    return res.render('home', {urls : allURLs});
});

router.get('/signup', (req, res)=>{
    return res.render('signup');
});

router.get('/login', (req, res)=>{
    return res.render('login');
});

router.get('/:shortId', handleRedirectToURL);

module.exports = router;