const express = require("express"),
    router = express.Router(),
    equipmentController = require('../controllers/equipment.controller')

router.route('/')
.get(equipmentController.getEquipment)
.post(equipmentController.createEquipment)
.put(equipmentController.updateEquipment)
//.delete(equipmentController.deleteEquipment);

module.exports = router;