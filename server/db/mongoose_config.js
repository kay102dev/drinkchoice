const Db = process.env.ATLAS_URI;
const mongoose = require("mongoose");

module.exports = {
    connectToServer: async () => require('mongoose').connect(Db),
    decisionSchema: () => {
        const DecisionSchema = new mongoose.Schema({
            temperature: Number,
            gender: String,
            age: Number,
            isCaffeineSensitive: String,
            timeOfDay: String,
            pregnant: String,
            healthConscious: String,
            drinksConsumedPerDay: Number,
            drinksConsumedToday: Number,
            decision: String
        });

        return mongoose.models.Decision || new mongoose.model('Decision', DecisionSchema);
    }
};