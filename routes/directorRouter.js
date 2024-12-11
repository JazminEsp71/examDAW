import express from 'express';
import directorService from '../service/directorService.js';

const router = express.Router();
const service = new directorService();

/**
 * @swagger
 * /directors:
 *   get:
 *     summary: Obtiene una lista de directores
 *     tags: [Directors]
 *     responses:
 *       200:
 *         description: Lista de directores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 */
router.get('/', async (req, res) => {
  try {
    const allDirectors = await service.getAll();
    res.status(200).json(allDirectors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /directors:
 *   post:
 *     summary: Crea un nuevo director
 *     tags: [Directors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Director creado
 */
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Falta el nombre del director.' });
    }

    const newDirector = await service.create({ name });
    res.status(201).json(newDirector);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @swagger
 * /directors/{id}:
 *   get:
 *     summary: Obtiene un director por ID
 *     tags: [Directors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del director
 *     responses:
 *       200:
 *         description: Director encontrado
 *       404:
 *         description: Director no encontrado
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const director = await service.getById(id);
    if (!director) {
      return res.status(404).json({ message: 'Director no encontrado.' });
    }
    res.json(director);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

/**
 * @swagger
 * /directors/{id}:
 *   patch:
 *     summary: Actualiza un director por ID
 *     tags: [Directors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del director
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Director actualizado
 *       404:
 *         description: Director no encontrado
 */
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Falta el nombre del director.' });
    }

    const updatedDirector = await service.update(id, { name });
    res.status(200).json(updatedDirector);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

/**
 * @swagger
 * /directors/{id}:
 *   delete:
 *     summary: Elimina un director por ID
 *     tags: [Directors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del director
 *     responses:
 *       200:
 *         description: Director eliminado
 *       404:
 *         description: Director no encontrado
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDirector = await service.delete(id);
    res.status(200).json(deletedDirector);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export default router;
