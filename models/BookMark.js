const mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);

const bookMarkSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
  },
});

bookMarkSchema.plugin(deepPopulate);
module.exports = mongoose.model('BookMark', bookMarkSchema);
