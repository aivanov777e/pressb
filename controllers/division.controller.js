const DivisionService = require('../services/division.service');
const sequelize = require('../services/db.service');
    
class DivisionController {
    async getDivision(req, res){
        console.log('getDivision');
        let data = await sequelize.models.division.findAll();
        return res.status(200).send(data);
        // let result = await DivisionService.getDivision(req.query);
        // return res.status(200).send({data: result});
    }

    async createDivision(req, res){
        if(req.body.division && req.body.division.id){
            if(req.division.hasOwnProperty(req.body.division.id))
            return res.status(409).send({message: 'Division already exists.'});

            req.division[req.body.division.id] = req.body.division;

            let result = await DivisionService.createDivision(req.division);

            if(result)
            return res.status(200).send(result);
            else
            return res.status(500).send({message: 'Unable create division.'});
        }else
            return res.status(400).send({message: 'Bad request.'});
    }

    // async updateDivision(req, res){
    // if(req.body.division && req.body.division.id){
    //     if(!req.division.hasOwnProperty(req.body.division.id))
    //     return res.status(404).send({message: 'Division not found.'});

    //     req.division[req.body.division.id] = req.body.division;

    //     let result = await DivisionService.updateDivision(req.division);

    //     if(result)
    //     return res.status(200).send(result);
    //     else
    //     return res.status(500).send({message: 'Unable update division.'});
    // }else
    //     return res.status(400).send({message: 'Bad request.'});
    // }

    // async deleteDivision(req, res){
    // if(req.query.id){
    //     if(req.division.hasOwnProperty(req.query.id)){
    //     delete req.division[req.query.id];

    //     let result = await DivisionService.deleteDivision(req.division);

    //     if(result)
    //         return res.status(200).send(result);
    //     else
    //         return res.status(500).send({message: 'Unable delete division.'});
    //     } else
    //     return res.status(404).send({message: 'Division not found.'});
    // }else
    //     return res.status(400).send({message: 'Bad request.'});
    // }
}

module.exports = new DivisionController();
