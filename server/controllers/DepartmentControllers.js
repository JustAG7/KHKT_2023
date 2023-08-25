const User = require('../models/user.model');
const Department = require('../models/department.model');
const Auth = require('../models/auth.model');

const getDepartments = async (req, res) => {
    try {
        const departments = await Department.find();
        res.json(departments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getDepartment = async (req, res) => {
    try {
        const department = await Department.findByName(req.params.name);
        if (!department) {
            return res.status(404).json({ error: 'Department not found' });
        }
        res.json(department);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateMemberToManager = async (req, res) => {
    try{
        const {id} = req.params;
        const departmentId = await Department.findOne({name: department});
        const department = await Department.findByIdAndUpdate(
            departmentId,
            {$pull: {members: id}}, {$push: {manager: id}}, {new: true} 
        );
        const auth = await Auth.findByIdAndUpdate(
            id,
            {role: 'manager'}, {new: true}
        );

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const addUsersToDepartment = async (req, res) => {
    const {users} = req.body;
    try{
        const departmentId = await Department.findOne({name: department});
        const department = await Department.findByIdAndUpdate(
            departmentId,
            {$push: {members: users}}, {new: true}
        );
        const user = await users.map((user =>{
            User.findByIdAndUpdate(
                user,
                {$push: {department: departmentId}}, {new: true}
            );
        }))


    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}

const updateManagerToMember = async (req, res) => {
    try{
        const {id} = req.params;
        const departmentId = await Department.findOne({name: department});
        const department = await Department.findByIdAndUpdate(
            departmentId,
            {$pull: {manager: id}}, {$push: {members: id}}, {new: true} 
        );
        const auth = await Auth.findByIdAndUpdate(
            id,
            {role: 'member'}, {new: true}
        );
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteUserFromDepartment = async (req, res) => {
    try{
        const {id} = req.params;
        const departmentId = await Department.findOne({name: department});
        const department = await Department.findByIdAndUpdate(
            departmentId,
            {$pull: {members: id}}, {new: true},
            {$pull: {manager: id}}, {new: true}
        );
        const auth = await Auth.findByIdAndUpdate(
            id,
            {role: 'member'}, {new: true}
        );
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateMemberToAnotherDepartment = async (req, res) => {
    try{
        const {id} = req.params;
        
        const departmentId = await Department.findOne({name: department});
        const department = await Department.findByIdAndUpdate(
            departmentId,
            {$push: {members: id}}, {new: true} 
        );
        const user = await User.findByIdAndUpdate(
            id,
            {$push : {department: departmentId}}, {new: true}
        );
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {getDepartments, getDepartment, updateMemberToManager, addUsersToDepartment, updateManagerToMember, deleteUserFromDepartment, updateMemberToAnotherDepartment};
