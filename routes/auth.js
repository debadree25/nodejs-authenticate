const router = require('express').Router();
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const { registrationSchema, loginSchema } = require('../validations');


router.post('/register', async (req, res) => {
    console.log('Registration request received');
    const validate = registrationSchema.validate(req.body);
    const { error } = validate;
    if (!error) {
        const emailExists = await User.findOne({ email: req.body.email });
        if (emailExists) {
            console.log("Invalid registration request : Email already exists");
            return res.status(400).send('Email address already exists');
        }
        const salt = await bcryptjs.genSalt(15);
        const hash = await bcryptjs.hash(req.body.password, salt);
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hash
        });
        try {
            const save = await user.save();
            res.status(201).send({ user: save._id, email: save.email, created_date: save.created_date });
            console.log("User registered successfully");
        }
        catch (err) {
            console.log("Error in registering user");
            res.status(400).send(err);
        }
    }
    else {
        console.log("Invalid registration request data");
        console.log(error.details[0].message);
        res.status(400).send(error.details[0].message);
    }
});

router.post('/login', async (req, res) => {
    console.log('Login request received');
    const validate = loginSchema.validate(req.body);
    const { error } = validate;
    if (!error) {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).send("Email or password is wrong");
        const password = await bcryptjs.compare(req.body.password,user.password);
        if(!password) return res.status(400).send("Email or password is wrong");
        res.status(200).send("User logged in");
        console.log('Successful login');
    }
    else {
        console.log("Invalid login request");
        res.status(400).send(error);
    }
});

module.exports = router;