import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// 获取已收藏书籍
router.get('/:userId/saved', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user.savedBooks || []);
  } catch (error) {
    console.error('Failed to fetch saved books:', error);
    res.status(500).json({ error: 'Failed to fetch saved books' });
  }
});

// 收藏书籍
router.post('/:userId/save', async (req, res) => {
  try {
    const { book } = req.body;

    // ✅ 验证 book 和 book.id 是否存在
    if (!book || !book.id) {
      return res.status(400).json({ error: 'Book ID is required' });
    }

    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    // 避免重复
    const alreadySaved = user.savedBooks.some(b => b.id === book.id);
    if (!alreadySaved) {
      user.savedBooks.push(book);
      await user.save();
    }

    res.json(user.savedBooks);
  } catch (error) {
    console.error('Failed to save book:', error);
    res.status(500).json({ error: 'Failed to save book' });
  }
});

// 取消收藏
router.delete('/:userId/unsave/:bookId', async (req, res) => {
  try {
    const { userId, bookId } = req.params;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.savedBooks = user.savedBooks.filter(b => b.id !== bookId);
    await user.save();

    res.json(user.savedBooks);
  } catch (error) {
    console.error('Failed to unsave book:', error);
    res.status(500).json({ error: 'Failed to unsave book' });
  }
});

export default router;
