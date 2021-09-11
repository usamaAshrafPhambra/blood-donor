const mongoose = require('mongoose');
  const { Schema } = mongoose;


  const GuserSchema = new Schema({
    googleId: {
        type : String,
        required: true
      },
      displayName: {
        type : String,
        required: true
      },
      date:{
          type: Date,
          default: Date.now
      }

  });

  module.exports = user = mongoose.model('guser' , GuserSchema);