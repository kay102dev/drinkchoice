const express = require("express");
const recordRoutes = express.Router();
const dbo = require("../db/mongoose_config");


// get a list of all the records.
recordRoutes.route("/record").get(function (req, res) {
    dbo.decisionSchema().find().then(result => {
        console.log('get a list of all the records', result);
        res.json(result)
    } );
});

// create a new record.
recordRoutes.route("/record/add").post(function (req, res) {
    const buildModel = dbo.decisionSchema()({
        temperature: req.body.temperature,
        gender: req.body.gender,
        age: req.body.age,
        isCaffeineSensitive: req.body.isCaffeineSensitive,
        timeOfDay: req.body.timeOfDay,
        pregnant: req.body.pregnant,
        healthConscious: req.body.healthConscious,
        drinksConsumedPerDay: req.body.drinksConsumedPerDay,
        drinksConsumedToday: req.body.drinksConsumedToday,
        decision: req.body.decision
    });
    buildModel.save().then(r =>{
        console.log('create a new record', r)
        res.json(r);
    });
});

module.exports = recordRoutes;