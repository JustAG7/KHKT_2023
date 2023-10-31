const User = require('../models/user.model');
const Auth = require('../models/auth.model');
const bcrypt = require('bcrypt');
const fileUpload = require('express-fileupload');

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getUsers = async (req, res) => {
    const { page = 1, limit = 9 } = req.query;
    try {
        const users = await User.find().limit(limit).skip((page - 1) * limit);
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const findByName = async (req, res) => {
    const { page = 1, limit = 9 } = req.query;
    const { search } = req.query;
    try {
        const users = await User.find({ name: { $regex: search, $options: 'i' } }).limit(limit);
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        await user.remove();
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const findByUser = async (req, res) => {
    const { page = 1, limit = 9 } = req.query;
    const { username } = req.query;
    try {
        const users = await User.find({ username: username }).limit(limit);
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


const addUser = async (req, res) => {
const { name, username, password, date, role, email, phone, avatar } = req.body;
  
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create a new user
    const user = await User.create({
      name,
      date,
      email,
      phone,
      avatar,
      status: 'active',
      date_joined: Date.now(),
      events: [],
    });
    await user.save();

    const auth = await Auth.create({
      username,
      password: hashedPassword,
      role,
      user: user._id,
    });
    await auth.save();

    res.json({ message: 'User added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = { getUser, getUsers, findByName, deleteUser, findByUser, addUser };