const { urlencoded } = require('express');
const express = require('express');
const request = require('request-promise');

const app = express();
const PORT = process.env.PORT || 5000;

// const generateUrl = `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

const generateUrl = (apiKey) => `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

app.use(express.json());

app.get('/', async (req, res) => {
    res.json('welcome to API');
})

app.get('/products/:productId', async (req, res) => {
    const { productId } = req.params;
    const { api_key } = req.query;

    try {
        const response = await request(`${generateUrl(api_key)}&url=https://www.amazon.com/dp/${productId}`);

        res.json(JSON.parse(response));
    } catch (err) {
        res.json(err);
    }
});

app.get('/products/:productId/reviews', async (req, res) => {
    const { productId } = req.params;
    const { api_key } = req.query;

    try {
        const response = await request(`${generateUrl(api_key)}&url=https://www.amazon.com/produc-reviews/${productId}`);

        res.json(JSON.parse(response));
    } catch (err) {
        res.json(err);
    }
});

app.get('/products/:productId/offers', async (req, res) => {
    const { productId } = req.params;
    const { api_key } = req.query;

    try {
        const response = await request(`${generateUrl(api_key)}&url=https://www.amazon.com/gp/offer-listings/${productId}`);

        res.json(JSON.parse(response));
    } catch (err) {
        res.json(err);
    }
});

app.get('/search/:searchQuery', async (req, res) => {
    const { searchQuery } = req.params;
    const { api_key } = req.query;

    try {
        const response = await request(`${generateUrl(api_key)}&url=https://www.amazon.com/s?k=${searchQuery}`);

        res.json(JSON.parse(response));
    } catch (err) {
        res.json(err);
    }
});


app.listen(PORT, () => {
    console.log(`server running ${PORT}`);
});