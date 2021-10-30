const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
  content: String,
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'Property'
  }
}, { timestamps: true })

module.exports = mongoose.model('Note', NoteSchema);