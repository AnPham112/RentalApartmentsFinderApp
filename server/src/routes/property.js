const express = require('express');
const { createProperty, deleteProperty, updateProperty, getList, createNote, getNotes } = require('../controllers/property');
const router = express.Router();

router.post('/create-property', createProperty);
router.post('/delete', deleteProperty);
router.post('/update', updateProperty);
router.get('/', getList);

router.post('/create-note', createNote);
router.post('/get-notes', getNotes)

module.exports = router;