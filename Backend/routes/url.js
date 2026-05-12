import express from "express";
import {handleUrlShorten, handleUrlGet, handleGetClicks} from "../controllers/url.js"

const router = express.Router();

router.post("/shorten", handleUrlShorten);

router.get('/:shortId', handleUrlGet);

router.get('/clicks/:shortId', handleGetClicks);

export default router;