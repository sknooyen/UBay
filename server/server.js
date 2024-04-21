const express = require("express");
const app = express();
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const userRoute = require("./routes/user")
const authRoute = require("./routes/auth")
const productRoute = require("./routes/product")
const messageRoute = require("./routes/message")
const cors = require("cors");
// const cartRoute = require("./routes/cart")
// const orderRoute = require("./routes/order")

app.use(cors())

dotenv.config();

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("DBConnection Success"))
.catch((err) => console.log(err))

app.use(express.json({ limit: '500kb' }))
app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/products", productRoute)
app.use("/api/messages", messageRoute)
// app.use("/api/carts", cartRoute)
// app.use("/api/orders", orderRoute)

app.listen(process.env.PORT || 8000, () => {
    console.log("Backend server is running")
})
