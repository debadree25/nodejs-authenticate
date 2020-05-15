const router = require('express').Router();

router.post('/register', (req,res) => {
    console.log('Registration request received');
});

module.exports = router;