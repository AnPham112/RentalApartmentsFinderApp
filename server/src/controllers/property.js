const Property = require('../models/property');

exports.createProperty = (req, res) => {
  const { name, address, type, furniture, bedroom, price, reporter, note } = req.body;
  const property = new Property({
    name,
    address,
    type,
    furniture,
    bedroom,
    price,
    reporter,
    note
  })
  property.save((error, property) => {
    if (error) return res.status(400).json({ error })
    if (property) return res.status(201).json({ property })
  })
}

exports.deleteProperty = (req, res) => {
  Property.findByIdAndRemove(req.body.id)
    .then(data => {
      res.send(data)
    }).catch((err) => {
      console.log("error", err)
    })
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
  }).then(data => {
    res.send(data)
  }).catch(err => {
    console.log("error", err)
  })
}

exports.getList = (req, res) => {
  Property.find({})
    .exec((error, properties) => {
      if (error) return res.status(400).json({ error })
      if (properties) return res.status(200).json({ properties })
    })
}