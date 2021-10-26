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
  property.save()
    .then(data => {
      res.send(data)
    }).catch((err) => {
      console.log(err)
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
    .then(data => {
      res.send(data)
    }).catch((err) => {
      console.log(err)
    })
}