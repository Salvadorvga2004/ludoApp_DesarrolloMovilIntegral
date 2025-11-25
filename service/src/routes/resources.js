const express = require('express');
const Resource = require('../models/Resource');


const router = express.Router();


router.get('/', async (req, res) => {
try {
const resources = await Resource.find().sort({ createdAt: -1 });
res.json(resources);
} catch (err) { res.status(500).send('Server error'); }
});


router.post('/', async (req, res) => {
// Para admin: crear recurso
try {
const r = new Resource(req.body);
await r.save();
res.json(r);
} catch (err) { res.status(500).send('Server error'); }
});


module.exports = router;