const router = require('express').Router();


router.post('/test', function (req, res) {
    res.json({ requestBody: req.body });
});

router.get('/test', async (req, res) => {
    let message = req.body
    res.json({message})
})




module.exports = router;
