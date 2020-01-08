const express = require("express"),
    router = express.Router(),
    paperController = require('../controllers/paper.controller')

router.route('/')
.get(paperController.getPaper)
.post(paperController.createPaper)
.put(paperController.updatePaper)
//.delete(paperController.deletePaper);

// router.route('/price')
// .get(paperController.getPaperPrice)
// .post(paperController.createPaperPrice)
//.put(paperController.updatePaperPrice)
//.delete(paperController.deletePaperPrice);

module.exports = router;