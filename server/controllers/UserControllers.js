const User = require('../models/user.model');
const Auth = require('../models/auth.model');
const Department = require('../models/department.model');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

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

