const { nanoid } = require('nanoid');
const urlModel = require('../models/url');

async function handleGenrateNewShortURL(req, res) {
    const body = req.body;
    if(!body.url) {
        return res.status(400).json({msg : "enter url"});
    }

    const shortID = nanoid(8);
    await urlModel.create({
        shortId : shortID,
        redirectURL : body.url,
        visitHistory : [],
        createdBy : req.user._id
    })

    res.render('home', {id : shortID});
}

async function handleGetVisitHistory(req, res) {
    const shortId = req.params.shortId; 
    const entry = await urlModel.findOne({ shortId });
    res.json({totalClicks : entry.visitHistory.length, visitHistory : entry.visitHistory});
}

module.exports = {
    handleGenrateNewShortURL,
    handleGetVisitHistory
}
