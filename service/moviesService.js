import DirectorModel from "../models/directorModel.js";
import moviesModel from "../models/moviesModel.js";

export default class moviesService {
  constructor() {}

  // Validar existencia de director
  async validateDirector(directorId) {
    try {
      const directorExists = await DirectorModel.findById(directorId);
      if (!directorExists) {
        throw new Error(`Director con ID ${directorId} no existe.`);
      }
    } catch (error) {
      throw new Error(`Error al validar director: ${error.message}`);
    }
  }

  // Crear nueva película
  async create(data) {
    try {
      await this.validateDirector(data.directorId);
      const newMovie = new moviesModel(data);
      await newMovie.save();
      return newMovie;
    } catch (error) {
      throw new Error(`Error al crear la película: ${error.message}`);
    }
  }

  // Obtener todas las películas
  async getAll() {
    try {
      const movies = await moviesModel.find();
      return movies;
    } catch (error) {
      throw new Error(`Error al obtener las películas: ${error.message}`);
    }
  }

  // Obtener película por ID
  async getById(id) {
    try {
      if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        throw new Error(`ID inválido: ${id}`);
      }
      const movie = await moviesModel.findById(id);
      if (!movie) {
        throw new Error(`Película con ID ${id} no encontrada.`);
      }
      return movie;
    } catch (error) {
      throw new Error(`Error al obtener la película: ${error.message}`);
    }
  }

  // Actualizar película por ID
  async update(id, changes) {
    try {
      if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        throw new Error(`ID inválido: ${id}`);
      }

      if (changes.directorId) {
        await this.validateDirector(changes.directorId);
      }

      const updatedMovie = await moviesModel.findByIdAndUpdate(id, changes, {
        new: true,
        runValidators: true,
      });

      if (!updatedMovie) {
        throw new Error(`Película con ID ${id} no encontrada.`);
      }

      return updatedMovie;
    } catch (error) {
      throw new Error(`Error al actualizar la película: ${error.message}`);
    }
  }

  // Eliminar película por ID
  async delete(id) {
    try {
      if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        throw new Error(`ID inválido: ${id}`);
      }

      const deletedMovie = await moviesModel.findByIdAndDelete(id);
      if (!deletedMovie) {
        throw new Error(`Película con ID ${id} no encontrada.`);
      }

      return deletedMovie;
    } catch (error) {
      throw new Error(`Error al eliminar la película: ${error.message}`);
    }
  }
}
