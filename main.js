const express = require('express');
const axios = require('axios');
const app = express();

const IMGFLIP_USERNAME = process.env.IMGFLIP_USERNAME;
const IMGFLIP_PASSWORD = process.env.IMGFLIP_PASSWORD;

app.get('/', async (req, res) => {
    try {
        const response = await axios.get('https://api.imgflip.com/get_memes');
        if (response.data.success) {
            const memes = response.data.data.memes;
            const randomMeme = memes[Math.floor(Math.random() * memes.length)];
            res.send(`<!DOCTYPE html><html><body><h1>Random Meme</h1><img src="${randomMeme.url}" alt="${randomMeme.name}"><p>${randomMeme.name}</p></body></html>`);
        } else {
            res.status(500).send('Failed to fetch memes');
        }
    } catch (error) {
        res.status(500).send('Error occurred while fetching memes');
    }
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
