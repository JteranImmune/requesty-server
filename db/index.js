const mongoose = require("mongoose");

const MONGO_URI =
process.env.MONGODB_URI  || "mongodb://localhost:27017/Task_App";

mongoose
.connect(MONGO_URI)
.then((x) => {
    const  dbName = x.connection[0].name;
    console.log(`MongoDB Connected. Database: "${dbName}"`);
})
.catch((err) => console.error("Error conectado ", err));