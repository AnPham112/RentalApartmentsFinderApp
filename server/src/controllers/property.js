const Property = require('../models/property');
const Note = require('../models/note');

exports.createProperty = (req, res) => {
  Property.findOne({ name: req.body.name })
    .exec((error, property) => {
      if (property) return res.status(400).json({
        message: 'Property name already exists'
      })
      const { name, address, type, furniture, bedroom, price, reporter, note } = req.body;
      const _property = new Property({
        name,
        address,
        type,
        furniture,
        bedroom,
        price,
        reporter,
        note
      })
      _property.save()
        .then(data => res.send(data))
        .catch(err => console.log(err))
    })
}

exports.deleteProperty = (req, res) => {
  Property.findByIdAndRemove(req.body.id)
    .then(data => res.send(data))
    .catch(err => console.log(err))
}

exports.updateProperty = (req, res) => {
  const { name, address, type, furniture, bedroom, price, reporter, note } = req.body;
  Property.findByIdAndUpdate(req.body.id, {
    name,
    address,
    type,
    furniture,
    bedroom,
    price,
    reporter,
    note
  }).then(data => res.send(data))
    .catch(err => console.log(err))
}

exports.getList = (req, res) => {
  Property.find({})
    .then(data => res.send(data))
    .catch(err => console.log(err))
}

exports.createNote = async (req, res) => {
  const { content } = req.body;
  const newNote = new Note({ content })
  const property = await Property.findById(req.body.id)
  newNote.owner = property
  await newNote.save()
  property.notes.push(newNote._id)
  await property.save()
  res.status(201).json({ note: newNote })
}

exports.getNotes = async (req, res) => {
  const property = await Property.findById(req.body.id)
    .populate('notes')
  res.status(200).json({ notes: property.notes })
}