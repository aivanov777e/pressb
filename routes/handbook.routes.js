const express = require("express"),
    router = express.Router(),
    controller = require('../controllers/handbook.controller')

router.route('/printer/')
.get(controller.getPrinter)
// .post(contactController.createContact)
// .put(ContactController.updateContact)
// .delete(ContactController.deleteContact);

module.exports = router;