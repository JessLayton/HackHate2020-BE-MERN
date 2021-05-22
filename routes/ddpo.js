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

router.get('/getDDPOs', async (_req, res) => {
  try {
    DDPO.find({}, (_err, data) => res.status(200).json({ data }));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Unexpected error occurred' });
  }
});

router.delete('/deleteDDPO', async (req, res) => {
  const { id } = req.body;
  try {
    await DDPO.deleteOne({ _id: id }, (error, DDPOResponse) => {
      if (error) {
        return res.status(500).json({ msg: 'Unexpected error occurred' });
      }
      return res.status(200).json({ response: DDPOResponse });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Unexpected error occurred' });
  }
});

module.exports = router;
