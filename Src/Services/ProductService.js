const { Op } = require("sequelize");
const { Product } = require("../../models");

const addProduct = async (name, price, description) => {
  console.log(Product);
  const existingProduct = await Product.findOne({ where: { name } });
  if (existingProduct) {
    throw new Error("Product already exists");
  }

  const newProduct = await Product.create({ name, price, description });
  return newProduct;
};

const updateProduct = async (id, name, price, description) => {
  const product = await Product.findByPk(id);

  if (!product) {
    throw new Error("Product does not exist");
  }

  product.name = name || product.name;
  product.price = price || product.price;
  product.description = description || product.description;

  await product.save();
  return product;
};

const deleteProduct = async (keyword) => {
  const product = await Product.findOne({
    where: {
      name: {
        [Op.like]: `%${keyword}%`,
      },
    },
  });

  if (!product) {
    throw new Error("Product does not exist");
  }

  await product.destroy();
  return product;
};

const listProducts = async () => {
  const products = await Product.findAll();
  return products;
};

module.exports = {
  addProduct,
  updateProduct,
  deleteProduct,
  listProducts,
};
