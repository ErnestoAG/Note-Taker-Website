const router = require('express').Router();


const notes = require('./notes');
const render = require('./render');

router.use('/', notes);
router.use('/notes', notes);
router.use('/render', render);

module.exports = router;