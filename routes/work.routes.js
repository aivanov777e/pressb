const express = require("express"),
    router = express.Router(),
    workController = require('../controllers/work.controller')

router.route('/')
.get(workController.getWork)
.post(workController.createWork)
.put(workController.updateWork)
//.delete(workController.deleteWork);

router.route('/price')
.post(workController.createWorkPrice)
.put(workController.updateWorkPrice)
//.delete(workController.deleteWorkPrice);

router.route('/price/delete')
.put(workController.deleteWorkPrice)

module.exports = router;