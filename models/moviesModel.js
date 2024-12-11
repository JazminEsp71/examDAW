import mongoose from "mongoose";

import AutoIncrementFactory from 'mongoose-sequence';

// plugin de autoincremento con instancia de Mongoose
const AutoIncrement = AutoIncrementFactory(mongoose);

const moviesSchema = new mongoose.Schema({
  movieNumber:{
    type:Number,
    require: true
  },
  title:{
    type:String,
    require: true
  },
  year:{
    type:Number,
    require: true
  },
  director :{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Director',
    required: true
  },
  descripcion:{
    type:String,
    require: true
  },
  categoria:{
    type:String,
    require: true
  },
  summary:{
    type:String,
    require: true
  },
  active:{
    type:Number,
    require: true
  },
});

// plugin de autoincremento de películas
moviesSchema.plugin(AutoIncrement, { inc_field: 'movieNumber' });

const moviesModel = mongoose.model('Movies', moviesSchema);

export default moviesModel;
