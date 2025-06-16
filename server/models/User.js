import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  savedBooks: [
  {
    id: String, // ✅ 新增
    title: String,
    authors: [String],
    description: String,
    thumbnail: String,
    infoLink: String
  }
]
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);
export default User;
