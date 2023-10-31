const User = require('../models/user.model');
const Event = require('../models/event.model');
const bcrypt = require('bcrypt');

const getEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.json(event);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const addEvent = async (req, res) => {
    try {

        const { name,password, description,  start, end, members} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const event = new Event({
            name,
            password: hashedPassword,
            description,
            start,
            end,
            participants: members.map((member) => new mongoose.Types.ObjectId(member)),
            status: 'pending'
        });
        await event.save();
        res.json({ message: 'Event created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const addMembersToEvent = async (req, res) => {

    try{
        const eventId = req.params.id;
        const {id} = req.body;
        const isMemberInParticipant = await Event.findOne(
            {participants: id, _id: eventId}
        )
        if(!isMemberInParticipant){
            const event = await Event.findByIdAndUpdate(
                eventId,
                {$push: {participants: id}}, {new: true}
            );
            const user = await User.findByIdAndUpdate(
                id,
                {$push: {events: eventId}}, {new: true}
            )
            await event.save();
            await user.save();
            res.json({ message: 'Member added to event successfully' });
            console.log("Member added to event successfully");
        }
        
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteMemberFromEvent = async (req, res) => {
    try{
        const {member} = req.body;
        const eventId = await Event.findOne({name: event});
        const event = await Event.findByIdAndUpdate(
            eventId,
            {$pull: {members: member}}, {new: true}
        );
        const user = await User.findByIdAndUpdate(
            member,
            {$pull: {event: eventId}}, {new: true}
        )
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const addActivityToFeed = async (req, res) => {
    try{
        const eventId = req.params.id;
        const {activity} = req.body;
        const event = await Event.findByIdAndUpdate(
            eventId,
            {$push: {feed: activity}}, {new: true}
        );
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const findEventByName = async (req, res) => {
    const { page = 1, limit = 9 } = req.query;
    const { search } = req.query;
    try {
        const events = await Event.find({ name: { $regex: search, $options: 'i' } }).limit(limit);
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateEvent = async (req, res) => {
    try {
        const { name, description, start, end } = req.body;
        const event = await Event.findByIdAndUpdate(
            req.params.id,
            { name, description, start, end },
            { new: true }
        );
        res.json({ message: 'Event updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }
        const deleteUserInEvent = await User.updateMany(
            { event: event._id },
            { $pull: { event: event._id } }
        );
        await event.remove();

        res.json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const event = await Event.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        res.json({ message: 'Event updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const checkPassword = async (req, res) => {
    try {
        const { password } = req.body;
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }
        const isMatch = await bcrypt.compare(password, event.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Wrong password' });
        }
        res.json({ message: 'Password is correct', event: event });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


module.exports = { getEvents, getEvent, addEvent, addMembersToEvent, deleteMemberFromEvent, addActivityToFeed, findEventByName, updateEvent, deleteEvent, updateStatus, checkPassword };