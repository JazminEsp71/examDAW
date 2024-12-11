import DirectorModel from "../models/directorModel.js";

export default class directorService {
  constructor() {}
  //craer nuevo
  async create(data) {
    const newDirector = new DirectorModel(data);
    await newDirector.save();
    return newDirector;
  }
  //obtener
  async getAll() {
    const directors = await DirectorModel.find();
    return directors;
  }
  //obtener por id
  async getById(id) {
    const director = await DirectorModel.findById(id);
    if (!director) {
      throw new Error('Director no encontrado.');
    }
    return director;
  }
  //actualizar
  async update(id, changes) {
    const updatedDirector = await DirectorModel.findByIdAndUpdate(id, changes, {
      new: true,
      runValidators: true,
    });

    if (!updatedDirector) {
      throw new Error(`Director con ID ${id} no encontrado.`);
    }

    return updatedDirector;
  }
  //borrar
  async delete(id) {
    const deletedDirector = await DirectorModel.findByIdAndDelete(id);
    if (!deletedDirector) {
      throw new Error(`Director con ID ${id} no encontrado.`);
    }
    return deletedDirector;
  }
}
