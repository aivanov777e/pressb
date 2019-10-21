const express = require("express"),
    router = express.Router(),
    controller = require('../controllers/handbook.controller')

router.route('/printer/')
.get(controller.getPrinter)
// .post(contactController.createContact)
// .put(ContactController.updateContact)
// .delete(ContactController.deleteContact);

router.route('/format/').get(controller.getFormat)
router.route('/color/').get(controller.getColor)
router.route('/material/').get(controller.getMaterial)

module.exports = router;