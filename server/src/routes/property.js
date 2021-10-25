const express = require('express');
const { createProperty, deleteProperty, updateProperty, getList } = require('../controllers/property');
const router = express.Router();

router.post('/create-property', createProperty);
router.post('/delete', deleteProperty);
router.post('/update', updateProperty);
router.get('/', getList);

module.exports = router;