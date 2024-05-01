const express = require("express");
const app = express();
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const productRoute = require("./routes/product")
const cors = require("cors");

app.use(cors())

dotenv.config();

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("DBConnection Success"))
.catch((err) => console.log(err))

app.use(express.json({ limit: '500kb' }))
app.use("/api/products", productRoute)

app.listen(process.env.PORT || 8000, () => {
    console.log("Backend server is running")
})