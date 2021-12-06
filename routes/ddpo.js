const router = require('express').Router();
const DDPO = require('../models/DDPOModel');

// TOD: remove async from callback
router.post('/addDDPO', async (req, res) => {
  try {
    const { name } = req.body;
    if (!name || name.length < 2 || name.length > 40) {
      return res.status(400).json({ msg: 'DDPOs must have a name between 2 and 40 characters' });
    }
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

// TOD: remove async from callback
router.get('/getDDPOs', async (_req, res) => {
  try {
    DDPO.find({}, (_err, data) => res.status(200).json({ data }));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Unexpected error occurred' });
  }
});

module.exports = router;
