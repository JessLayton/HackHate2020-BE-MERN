const router = require('express').Router();

router.use('/dash', require('./dash'));
router.use('/ddpo', require('./ddpo'));
router.use('/form', require('./form'));

module.exports = router;
