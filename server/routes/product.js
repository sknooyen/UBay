const Product = require("../models/Product");
const { route } = require("./auth");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken")

const router = require("express").Router();

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

// UPDATE
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

// DELETE
router.delete("/:id", async (req, res) =>  {
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json("Product has been deleted...")
    } catch(err) {
        res.status(500).json(err)
    }
})

// GET PRODUCT
router.get("/find/:id", async (req, res) =>  {
    try {
        const product = await Product.findById(req.params.id)
        res.status(200).json(product);
    } catch(err) {
        res.status(500).json(err)
    }
})

//GET ALL
// router.get("/", async (req, res) =>  {
//     const qNew = req.query.new;
//     const qCategory = req.query.category;
//     try {
//         let products;
//         if (qNew){
//             products = await Product.find().sort({createdAt: -1}).limit(1);
//         } else if (qCategory) {
//             products = await Product.find({category: qCategory});
//         } else {
//             products = await Product.find();
//         }
//         res.status(200).json(products);
//     } catch(err) {
//         res.status(500).json(err);
//     }
// })

router.get("/", async (req, res) =>  {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    const qIdEmail = req.query.id_email; // Add this line to extract id_email query parameter
    try {
        let products;
        if (qIdEmail) {
            products = await Product.find({ id_email: qIdEmail }); // Filter products by id_email if the query parameter is provided
        } else if (qNew) {
            products = await Product.find().sort({ createdAt: -1 }).limit(1);
        } else if (qCategory) {
            products = await Product.find({ category: qCategory });
        } else {
            products = await Product.find();
        }
        res.status(200).json(products);
    } catch(err) {
        res.status(500).json(err);
    }
})

// //GET USER STATs
// router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
//     const date = new Date();
//     const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

//     try {
//         const data = await User.aggregate([
//             {$match: {createdAt: {$gte: lastYear}}},
//             {
//                 $project: {
//                     month: {$month: "$createdAt"}
//                 }
//             },
//             {
//                 $group: {
//                     _id: "$month",
//                     total: {$sum: 1}
//                 }
//             }
//         ])
//         res.status(200).json(data)
//     } catch(err) {
//         res.status(500).json(err)
//     }
// })

module.exports = router