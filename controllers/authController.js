const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

exports.register = async (req, res) => {
    const { username, email, password } = req.body;
  
    try {
      const user = new User({ username, email, password });
      await user.save();
      const token = generateToken(user);
      res.status(201).json({ message: 'User registered successfully', token });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = generateToken(user);
    res.status(200).json({ token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
