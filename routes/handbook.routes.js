const express = require("express"),
    router = express.Router(),
    controller = require('../controllers/handbook.controller')

// router.route('/equipment/')
// .get(controller.getEquipment)
// .post(controller.createEquipment)
// .put(controller.updateEquipment)
// .delete(controller.deleteContact);

router.route('/format/').get(controller.getFormat)
router.route('/color/').get(controller.getColor)
router.route('/material/').get(controller.getMaterial)
router.route('/postPressType/').get(controller.getPostPressType)

module.exports = router;