const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Auth = require('../models/auth.model');
const User = require('../models/user.model');
const Department = require('../models/department.model');

const login = async (req, res) => {
    try{
        const {username, password} = req.body;
        const user = await Auth.findOne({username: username});
        if(!user){
            return res.status(401).json({error: 'Invalid credentials'});
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(401).json({error: 'Invalid credentials'});
        }
        const token = jwt.sign({
            id: user._id,
            role: user.role
        }, process.env.JWT_SECRET);

        res.set('Authorization', "Bearer " + token);
        res.json({message: 'Login successful', role: user.role});

    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const register = async (req, res) => {
    try{
        const {
            username,
            password,
            name,
            dob,
            email,
            phone,
            address,
            avatar,
            department,
            status
        } = req.body;
        const checkExistedUser = Auth.findOne({username: username});
        if(checkExistedUser){
            return res.status(401).json({error: 'Username already exists'});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const id = new mongoose.Types.ObjectId(user._id);
        const auth = new Auth({
            username,
            password: hashedPassword,
            role: 'member',
            user: id
        });
        await auth.save();
        const departmentId = await Department.findOne({name: department});
        const user = new User({
            name,
            dob,
            email,
            phone,
            address,
            avatar,
            department: departmentId._id,
            position: 'member',
            status,
        });
        await user.save();
        await Department.updateOne({_id: departmentId._id}, {$push: {members: id}});
        res.status(201).json({message: 'User registered successfully'});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = {login, register};