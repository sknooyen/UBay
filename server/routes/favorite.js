const Favorite = require("../models/Favorite");

const router = require("express").Router();

// POST FUNCTION (PUSH TO DATABASE)
router.post("/", async (req, res) => {
    const newProduct = new Favorite(req.body)

    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
})

// DELETE FROM FAVORITE DATABASE
router.delete("/:id", async (req, res) =>  {
    try {
        await Favorite.findByIdAndDelete(req.params.id)
        res.status(200).json("Product has been deleted from favorite...")
    } catch(err) {
        res.status(500).json(err)
    }
})

//GET ALL PRODUCTS FROM DATABASE THAT IN THE USER PREFERENCES
router.get("/", async (req, res) =>  {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    const qIdEmail = req.query.id_email; // Add this line to extract id_email query parameter
    try {
        let products;
        if (qIdEmail) {
            products = await Favorite.find({ id_email: qIdEmail }); // Filter products by id_email if the query parameter is provided
        } else if (qNew) {
            products = await Favorite.find().sort({ createdAt: -1 }).limit(1);
        } else if (qCategory) {
            products = await Favorite.find({ category: qCategory });
        } else {
            products = await Favorite.find();
        }
        res.status(200).json(products);
    } catch(err) {
        res.status(500).json(err);
    }
})

module.exports = router