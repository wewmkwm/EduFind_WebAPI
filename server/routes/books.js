import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/', async (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ message: 'Missing query parameter: q' });
  }

  try {
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(q)}`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching books:', error.message);
    res.status(500).json({ message: 'Failed to fetch books' });
  }
});

export default router;
