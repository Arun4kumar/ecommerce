import Order from "../db/model/Order.js";
import asyncErrorsHandler from "../errors/asyncErrorsHandler.js";
import CustomError from "../errors/CustomError.js";

//post request

const postOrder = asyncErrorsHandler(async (req, res) => {
  const {
    orderItems,
    itemsPrice,
    taxPrice,
    shippingPrice,
    shippingAddress,
    totalPrice,
    paymentMethod,
  } = req.body;
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  }

  const modified = orderItems.map((item) => ({ ...item, product: item._id }));
  console.log(req.user);
  const order = new Order({
    orderItems: modified,
    user: req.user._id,
    itemsPrice,
    taxPrice,
    shippingPrice,
    shippingAddress,
    totalPrice,
    paymentMethod,
  });
  const createdOrder = await order.save();

  res.json(createdOrder);
});

//get request

const getOrderById = asyncErrorsHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.json(order);
  } else {
    throw new CustomError(404, "Order not Found");
  }
});

const updateOrderToPaid = asyncErrorsHandler(async (req, res) => {
  console.log(req.body);
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    throw new CustomError(404, "Order not Found");
  }
});

const getMyOrders = asyncErrorsHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });

  res.json(orders);
});

const getOrders = asyncErrorsHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "name email");

  res.json(orders);
});

const makeDelivered = asyncErrorsHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  order.isDelivered = true;
  order.deliveredAt = new Date();
  await order.save();
  res.json({ message: "Delivered Updated Successfully" });
});
export {
  postOrder,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
  makeDelivered,
};
