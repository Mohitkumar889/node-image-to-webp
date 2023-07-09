const router = require("express").Router();

// router.use('/admin', require("./admin"));

router.use('/image-converter',require("./imageconverter"));


module.exports = router;