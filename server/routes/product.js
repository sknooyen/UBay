const Product = require("../models/Product");
const router = require("express").Router();

// Make new
router.post("/", async (req, res) => {
    const newProduct = new Product(req.body)

    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
})

// Update
router.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete
router.delete("/:id", async (req, res) =>  {
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json("Product has been deleted...")
    } catch(err) {
        res.status(500).json(err)
    }
})

// Get request for products with filters
router.get("/", async (req, res) =>  {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    const qIdEmail = req.query.id_email; // Add this line to extract id_email query parameter
    const qFavOf = req.query.fav_of;
    const qID = req.query.id;
    try {
        let products;
        if (qIdEmail) {
            products = await Product.find({ id_email: qIdEmail }); // Filter products by id_email if the query parameter is provided
        } else if (qNew) {
            products = await Product.find().sort({ createdAt: -1 }).limit(1);
        } else if (qCategory) {
            products = await Product.find({ category: qCategory });
        } else if (qFavOf) {
            products = await Product.find({ favorite_id: qFavOf });
        } else if (qID) {
            products = await Product.findOne({ id: qID });
        } else {
            products = await Product.find();
        }
        console.log(products)
        res.status(200).json(products);
    } catch(err) {
        res.status(500).json(err);
    }
})

module.exports = router