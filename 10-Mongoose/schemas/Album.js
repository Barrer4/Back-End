const mongoose = require('mongoose')


const albumSchema = mongoose.Schema({
   _id: mongoose.Schema.Types.ObjectId,
   title: {
      type: String,
      required: [true, 'El título es un campo obligatorio']
   }
   ,
   artist: {
      type: mongoose.Schema.Types.String,
      required: [true, 'El artista es un campo obligatorio'],
   },
   year: {
      type: Number,
      required: [true, 'El año es un campo obligatorio'],
   }
   ,
   genre: String,
   stock: {
      type: Number,
      required: [true, 'El género es un campo obligatorio'],
},
   format: {
   type: String,
   required: [true, 'El formato es un campo obligatorio'],
},
})

module.exports = mongoose.model('album', albumSchema)