const {
  addProductToCart,
  deleteProductFromCart,
  placeOrder,
  processOrder,
  orderDelivered,
} = require("../Services/OrderService");

const AddProducttoCartController = async (request, response) => {
  const { UserId, ProductId, Quantity } = request.body;

  try {
    const newProduct = await addProductToCart(ProductId, Quantity, UserId);

    if (newProduct) {
      return response.status(200).json({
        success: "Product added successfully!",
        details: `${ProductId}:${Quantity}`,
      });
    }
  } catch (error) {
    response.status(500).json({
      error: "An error occured",
      details: error.message,
    });
  }
};

const DeleteProductFromCartController = async (request, response) => {
  const { ProductId, UserId } = request.body;

  try {
    const deletedProduct = await deleteProductFromCart(ProductId, UserId);

    if (deletedProduct) {
      return response.status(200).json({
        success: "Product deleted successfully",
        details: `${ProductId}`,
      });
    }
  } catch (error) {
    response.status(500).json({
      error: "An error occured",
      details: error.message,
    });
  }
};

const PlaceOrderController = async (request, response) => {
  const { UserId } = request.body;
  try {
    const order = await placeOrder(UserId);
    if (order) {
      return response.status(200).json({
        success: "Order placed successfully!",
        details: `User: ${UserId}`,
      });
    }
  } catch (error) {
    response.status(500).json({
      error: "An error occured",
      details: error.message,
    });
  }
};

const ProcessOrderController = async (request, response) => {
  const { UserId, Cart } = request.body;
  try {
    const order = await processOrder(UserId, Cart);
    if (order) {
      return response.status(200).json({
        success: "Processing order",
        details: `User: ${UserId}`,
      });
    }
  } catch (error) {
    response.status(500).json({
      error: "An error occured",
      details: error.message,
    });
  }
};

const OrderDeliveredController = async (request, response) => {
  const { CarrierId, UserId, OrderId } = request.body;

  await orderDelivered(CarrierId, UserId);

  return response.status(200).json({
    success: "Order delivered successfully!",
  });
};
module.exports = {
  AddProducttoCartController,
  DeleteProductFromCartController,
  PlaceOrderController,
  ProcessOrderController,
  OrderDeliveredController,
};
