const express = require("express"),
    router = express.Router(),
    contactController = require('../controllers/contact.controller')

router.route('/')
.get(contactController.getContact)
// .post(contactController.createContact)
// .put(ContactController.updateContact)
// .delete(ContactController.deleteContact);

module.exports = router;