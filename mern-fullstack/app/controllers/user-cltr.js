const User = require('../models/user-model');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

const { userRegisterValidationSchema, userLoginValidationSchema }  = require('../validators/user-validators');
const usersCltr = {};

usersCltr.register = async (req, res) => {
    const body = req.body;
    const {error, value} = userRegisterValidationSchema.validate(body, {abortEarly: false});
    if(error) {
        return res.status(400).json({error: error.details.map(err => err.message)});
    }
    try {
        const userPresentWithEmail = await User.findOne({email: value.email});
        if (userPresentWithEmail){
            return res.status(400).json({error: 'email already taken'});
        } else {
            const user = new User(value);
            const salt = await bcryptjs.genSalt();
            const hashPassword = await bcryptjs.hash(value.password, salt);
            user.password = hashPassword; 
            const userCount = await User.countDocuments();
            if(userCount == 0) {
            user.role = 'admin';
            }
            await user.save();
            res.status(201).json(user);
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'something went wrong'})
    }
}

usersCltr.login = async (req, res) => {
    const body = req.body;
    const {error, value} = userLoginValidationSchema.validate(body, {abortEarly: false});
    if(error){
        return res.status(400).json({error:error.details.map(err => err.message)});
    }
    const userPresent = await User.findOne({ email:value.email});
    if(!userPresent){
        return res.status(400).json({error:'invalid email'});
    }
    const isPasswordMatch = await bcryptjs.compare(value.password, userPresent.password);
    
    if(!isPasswordMatch){
        return res.status(400).json({error:'invalid password'})
    }
    // generate a jwt & send the jwt
    const tokenData = { userId: userPresent._id, role: userPresent.role };
    const token = jwt.sign(tokenData,process.env.JWT_SECRET, { expiresIn: '7d'});
    res.json({ token:token});
}

usersCltr.list = async (req, res) => {
    try {
        if (req.role != 'admin') {
            return res.status(403).json({ error: ' Admins only.' });
        }
        const users = await User.find().select('-password');
        res.json(users);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

usersCltr.createModerator = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(400).json({ error: 'Email already exists' });
        }
        const salt = await bcryptjs.genSalt();
        const hashPassword = await bcryptjs.hash(password, salt);
        const user = new User({ username, email, password: hashPassword, role: 'moderator' });
        await user.save();
        res.status(201).json({ message: 'Moderator created', user });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

module.exports = usersCltr;