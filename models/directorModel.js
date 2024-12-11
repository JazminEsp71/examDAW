import mongoose from 'mongoose';

const directorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
});

const DirectorModel = mongoose.model('Director', directorSchema);

export default DirectorModel;
