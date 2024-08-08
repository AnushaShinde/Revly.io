const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post('/api/analyze', async (req, res) => {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: 'URL is required' });

    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);

        const performanceTiming = JSON.parse(
            await page.evaluate(() => JSON.stringify(window.performance.timing))
        );

        const metrics = {
            loadTime: performanceTiming.loadEventEnd - performanceTiming.navigationStart,
            totalRequestSize: await page.evaluate(() =>
                Array.from(document.querySelectorAll('img')).reduce((total, img) => total + (img.fileSize || 0), 0)
            ),
            numberOfRequests: await page.evaluate(() => window.performance.getEntriesByType('resource').length)
        };

        await browser.close();

        res.json(metrics);
    } catch (error) {
        res.status(500).json({ error: 'Error analyzing website performance' });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
