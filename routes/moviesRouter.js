import express from 'express';
import mongoose from 'mongoose';
import moviesService from '../service/moviesService.js';

const router = express.Router();
const service = new moviesService();

/**
 * @swagger
 * /movies:
 *   get:
 *     summary: Obtiene una lista de películas
 *     tags: [Movies]
 *     responses:
 *       200:
 *         description: Lista de películas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   number:
 *                     type: number
 *                   title:
 *                     type: string
 *                   year:
 *                     type: number
 *                   description:
 *                     type: string
 *                   categoria:
 *                     type: string
 *                   summary:
 *                     type: string
 *                   active:
 *                     type: number
 */
router.get('/', async (req, res) => {
  try {
    const allMovies = await service.getAll();
    res.status(200).json(allMovies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /movies:
 *   post:
 *     summary: Crea una nueva película
 *     tags: [Movies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               year:
 *                 type: number
 *               directorId:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               categoria:
 *                 type: string
 *               summary:
 *                 type: string
 *               active:
 *                 type: number
 *     responses:
 *       201:
 *         description: Película creada
 */
router.post('/', async (req, res) => {
  try {
    const { title, year, directorId, descripcion, categoria, summary, active } = req.body;

    // Verifica si directorId es un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(directorId)) {
      return res.status(400).json({ message: 'directorId no es un ObjectId válido.' });
    }

    if (!title || !year) {
      return res.status(400).json({ message: 'Faltan datos obligatorios: title, year.' });
    }

    const newMovie = await service.create({
      title,
      year,
      directorId,
      descripcion,
      categoria,
      summary,
      active,
    });
    res.status(201).json(newMovie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @swagger
 * /movies/{id}:
 *   get:
 *     summary: Obtiene una película por ID
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la película
 *     responses:
 *       200:
 *         description: Película encontrada
 *       404:
 *         description: Película no encontrada
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await service.getById(id);
    if (!movie) {
      return res.status(404).json({ message: 'Película no encontrada.' });
    }
    res.json(movie);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

/**
 * @swagger
 * /movies/{id}:
 *   patch:
 *     summary: Actualiza una película por ID
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la película
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               year:
 *                 type: number
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Película actualizada
 *       404:
 *         description: Película no encontrada
 */
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const changes = req.body;
    const updatedMovie = await service.update(id, changes);
    if (!updatedMovie) {
      return res.status(404).json({ message: 'Película no encontrada.' });
    }
    res.json(updatedMovie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @swagger
 * /movies/{id}:
 *   delete:
 *     summary: Elimina una película por ID
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la película
 *     responses:
 *       200:
 *         description: Película eliminada
 *       404:
 *         description: Película no encontrada
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMovie = await service.delete(id);
    if (!deletedMovie) {
      return res.status(404).json({ message: 'Película no encontrada.' });
    }
    res.json(deletedMovie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
