const {
  addProduct,
  deleteProduct,
  updateProduct,
  listProducts,
} = require("../Services/ProductService");

const addProductController = async (request, response) => {
  const { name, price, description } = request.body;

  try {
    const newProduct = await addProduct(name, price, description);
    return res
      .status(200)
      .json({ success: "Product created", product: newProduct });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const updateProductController = async (request, response) => {
  const { id } = response.params;
  const { name, price, description } = request.body;

  try {
    const updatedProduct = await updateProduct(id, name, price, description);
    return response
      .status(200)
      .json({ success: "Product updated", product: updatedProduct });
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
};

const deleteProductController = async (request, response) => {
  const { keyword } = request.body;

  try {
    const deletedProduct = await deleteProduct(keyword);
    return response
      .status(200)
      .json({ success: "Product deleted", product: deletedProduct });
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
};

const listProductController = async (request, response) => {
  try {
    const products = await listProducts();
    return response.status(200).json({ products });
  } catch (error) {
    return response.status(500).json({ error: "Unable to fetch products" });
  }
};

module.exports = {
  addProductController,
  updateProductController,
  deleteProductController,
  listProductController,
};
