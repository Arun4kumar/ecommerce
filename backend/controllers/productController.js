import Product from "../db/model/Product.js";
import asyncErrorsHandler from "../errors/asyncErrorsHandler.js";
import CustomError from "../errors/CustomError.js";

const getProducts = asyncErrorsHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Product.countDocuments({ ...keyword });

  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

const getProduct = asyncErrorsHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    throw new CustomError(404, "Product not found");
  }
  res.json(product);
});

const deleteProduct = asyncErrorsHandler(async (req, res) => {
  const products = await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Successfully Deleted Product" });
});

const createProduct = asyncErrorsHandler(async (req, res) => {
  const product = new Product({
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample brand",
    category: "Sample category",
    countInStock: 0,
    numReview: 0,
    description: "Sample description",
  });
  const newProduct = await product.save();
  res.status(201).json(newProduct);
});

const updateProduct = asyncErrorsHandler(async (req, res) => {
  const {
    name,
    price,
    image,
    brand,
    category,
    countInStock,
    numReview,
    description,
  } = req.body;
  const editable = await Product.findById(req.params.id);
  console.log(image);
  if (editable) {
    editable.name = name;
    editable.price = price;
    editable.image = image;
    editable.brand = brand;
    editable.category = category;
    editable.numReview = numReview;
    editable.countInStock = countInStock;
    editable.description = description;
    const updatedProduct = await editable.save();
    res.json({
      message: "Product Update Successfully",
      update: updatedProduct,
    });
  } else {
    throw new CustomError(404, "This product doesn't Exists");
  }
});

const addReview = asyncErrorsHandler(async (req, res) => {
  const { comment, ratings } = req.body;
  console.log("i am in add review".yellow);
  console.log(req.body);
  const product = await Product.findById(req.params.id);

  const reviews = product.reviews;

  const isReviewed = reviews.find(
    (review) => review.user.toString() === req.user._id.toString()
  );
  const temp = Number(ratings);

  if (isReviewed) {
    throw new CustomError(400, "Already reviewed by User");
  } else {
    const review = {
      ratings: temp,
      comment,
      user: req.user._id,
      name: req.user.name,
    };

    product.reviews.push(review);
    product.numReview = product.numReview + 1;
    product.ratings = (
      (product.ratings + temp) / product.numReview +
      1
    ).toFixed(1);
    await product.save();
  }

  res.json({ message: "Successfully updated review" });
});

const getTopProducts = asyncErrorsHandler(async (req, res) => {
  const products = await Product.find({}).sort({ ratings: -1 }).limit(3);
  res.json(products);
});

export {
  getTopProducts,
  getProducts,
  getProduct,
  deleteProduct,
  createProduct,
  updateProduct,
  addReview,
};
