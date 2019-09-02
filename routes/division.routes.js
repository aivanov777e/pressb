const express = require("express"),
    router = express.Router(),
    divisionController = require('../controllers/division.controller')
    //DivisionService = require('../services/division.service');

// router.use(async (req, res, next) => {
// let data = await DivisionService.getDivision();

// if(data){
//   req.division = data;
//   next();
// }else
//   return res.status(500).send({message: 'Error while getting division'});
// });

router.route('/')
.get(divisionController.getDivision)
.post(divisionController.createDivision)
// .put(DivisionController.updateDivision)
// .delete(DivisionController.deleteDivision);

module.exports = router;