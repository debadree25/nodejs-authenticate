const router = require('express').Router();
const User = require('../model/User');

router.post('/register', async (req,res) => {
    console.log('Registration request received');
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    try {
        const save = await user.save();
        res.status(201).send(save);
        console.log("User registered successfully");
    }
    catch(err) {
        console.log("Error in registering user");
        res.status(400).send(err);
    }
});

module.exports = router;