const {
  addProduct,
  deleteProduct,
  updateProduct,
  listProducts,
} = require("../Services/ProductService");

const addProductController = async (req, res) => {
  const { name, price, description } = req.body;

  try {
    const newProduct = await addProduct(name, price, description);
    return res
      .status(200)
      .json({ success: "Product created", product: newProduct });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const updateProductController = async (req, res) => {
  const { id } = req.params;
  const { name, price, description } = req.body;

  try {
    const updatedProduct = await updateProduct(id, name, price, description);
    return res
      .status(200)
      .json({ success: "Product updated", product: updatedProduct });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deleteProductController = async (req, res) => {
  const { keyword } = req.body;

  try {
    const deletedProduct = await deleteProduct(keyword);
    return res
      .status(200)
      .json({ success: "Product deleted", product: deletedProduct });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const listProductController = async (req, res) => {
  try {
    const products = await listProducts();
    return res.status(200).json({ products });
  } catch (error) {
    return res.status(500).json({ error: "Unable to fetch products" });
  }
};

module.exports = {
  addProductController,
  updateProductController,
  deleteProductController,
  listProductController,
};
