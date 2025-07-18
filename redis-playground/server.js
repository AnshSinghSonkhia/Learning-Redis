const express = require('express');
const axios = require('axios');
const redis = require('redis');

const app = express();
const PORT = 3000;

// Create Redis client
const redisClient = redis.createClient();

redisClient.on('error', (err) => {
    console.error('Redis error:', err);
});

// Helper to promisify Redis GET
const getAsync = (key) =>
    new Promise((resolve, reject) => {
        redisClient.get(key, (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });

app.get('/data', async (req, res) => {
    const cacheKey = 'fakeApiData';

    try {
        // Check cache
        const cachedData = await getAsync(cacheKey);
        if (cachedData) {
            return res.json({ source: 'cache', data: JSON.parse(cachedData) });
        }

        // Fetch from fake API
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
        const data = response.data;

        // Cache in Redis for 10 seconds
        redisClient.setex(cacheKey, 10, JSON.stringify(data));

        res.json({ source: 'api', data });
    } catch (err) {
        res.status(500).json({ error: 'Error fetching data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});