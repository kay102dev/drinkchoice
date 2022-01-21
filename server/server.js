const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));

// get driver connection
const dbo = require("./db/mongoose_config");

app.listen(port, async () => {
    // perform a database connection when server starts
    const conn = await dbo.connectToServer().catch(e => console.log('error message Mongoose connection: ', e.message));
    if (conn) {
        console.log("Successfully connected to MongoDB via Mongoose Client.");
    }
    console.log(`Server is running on port: ${port}`);
});