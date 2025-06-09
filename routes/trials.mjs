import express from 'express';
import Trial from '../models/Trial.mjs';
import { authMiddleware } from '../middleware/authMiddleware.mjs';

const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
  try {
    const trials = await Trial.find({ userId: req.user.id });
    res.json(trials);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const trial = await Trial.findById(req.params.id);
    if (!trial || trial.userId.toString() !== req.user.id) {
      return res.status(404).json({ message: 'Trial not found' });
    }
    res.json(trial);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', authMiddleware, async (req, res) => {
  try {
    const trial = new Trial({ ...req.body, userId: req.user.id });
    await trial.save();
    res.status(201).json(trial);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data' });
  }
});

router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const trial = await Trial.findById(req.params.id);
    if (!trial || trial.userId.toString() !== req.user.id) {
      return res.status(404).json({ message: 'Trial not found' });
    }
    Object.assign(trial, req.body);
    await trial.save();
    res.json(trial);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data' });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const trial = await Trial.findById(req.params.id);
    if (!trial || trial.userId.toString() !== req.user.id) {
      return res.status(404).json({ message: 'Trial not found' });
    }
    await trial.remove();
    res.json({ message: 'Trial deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;