const router = require('express').Router();
const DDPO = require('../models/DDPOModel');

router.post('/addDDPO', async (req, res) => {
  const { name } = req.body;
  try {
    const DDPOData = new DDPO({
      name,
    });
    await DDPOData.save();
    return res.status(200).json({
      data: {
        name,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Unexpected error occurred' });
  }
});

router.get('/getDDPOs', async (req, res) => {
  try {
    DDPO.find({}, (err, data) => res.status(200).json({ data }));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Unexpected error occurred' });
  }
});

module.exports = router;
