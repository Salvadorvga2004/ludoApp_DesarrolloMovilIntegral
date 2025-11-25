const mongoose = require('mongoose');


const ResourceSchema = new mongoose.Schema({
title: String,
description: String,
url: String,
category: String, // e.g. 'helpline', 'article', 'therapy'
createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Resource', ResourceSchema);