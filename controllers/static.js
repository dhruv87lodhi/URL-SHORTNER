const urlModel = require('../models/url');

async function handleRedirectToURL(req, res) {
    const shortId = req.params.shortId;
    const entry = await urlModel.findOneAndUpdate(
        {
            shortId : shortId
        }
        ,
        {
            $push: {
                visitHistory : {
                    timestamp : Date.now()
                }
            }
        })
    if (!entry) {
        return res.status(404).send('URL not found');
    }
    res.redirect(entry.redirectURL);
}

module.exports = {
    handleRedirectToURL
}