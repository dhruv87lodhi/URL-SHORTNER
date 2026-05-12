import { nanoid } from "nanoid";
import Url from "../models/url.js";

const handleUrlShorten = async (req, res) => {
    try {
        const {originalUrl} = req.body;

        if (!originalUrl) return res.status(400).json({ error: "URL is required" });

        let shortId;
        let exists = true;
        while(exists) {
            shortId = nanoid(7);
            exists = await Url.findOne({shortId});
        }

        let url = new Url({originalUrl, shortId});
        await url.save();

        res.json({
            shortId: url.shortId,
            shortUrl: `${process.env.BASE_URL}/url/${url.shortId}`
        })
        
    } catch (error) {
        console.log("Error in /shorten route: " + error);
        res.status(500).json({ error: "Internal server error" });
    }
}

const handleUrlGet = async(req, res) => {
    try {
        const shortId = req.params.shortId;

        const url = await Url.findOne({shortId});
        if(!url) return res.status(400).json({error : "invalid shorten url"})

        url.clicks++;
        await url.save();
        res.redirect(url.originalUrl);

    } catch (error) {
        console.log("Error in /shorten route: " + error);
        res.status(500).json({ error: "Internal server error" });
    }
}

const handleGetClicks = async(req, res) => {
    try {
        const {shortId} = req.params;

        const url = await Url.findOne({shortId});
        if(!url) return res.status(400).json({error : "invalid shorten url"})
            
        res.json({clicks : url.clicks});
    } catch(error) {
        console.log("Error in /shorten route: " + error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export {handleUrlShorten, handleUrlGet, handleGetClicks};