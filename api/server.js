const express = require('express');
const whois = require('whois');

const app = express();
const PORT = process.env.PORT || 3000;

// Endpoint to check domain availability
app.get('/check-domain', (req, res) => {
    const domain = req.query.domain;

    if (!domain) {
        return res.status(400).json({ error: 'Domain parameter is required' });
    }

    whois.lookup(domain, (err, data) => {
        if (err) {
            return res.status(500).json({ status: 'Error', message: err.message });
        }

        // Determine if the domain is registered or available
        const isAvailable = data.includes('No match for') || data.includes('NOT FOUND');
        const status = isAvailable ? 'Available' : 'Sold';

        res.json({ domain, status });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
