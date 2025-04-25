const { body, param } = require("express-validator");

const rules = [
  body("name").notEmpty().withMessage("Name is required"),
  body("price")
    .notEmpty()
    .isNumeric()
    .withMessage("Price must be a number")
    .custom((value) => {
      if (value <= 0) {
        throw new Error("Price must be a positive number");
      }
      return true;
    }),
  body("description").notEmpty().withMessage("Description is required!"),
];

const addProductRules = () => {
  return rules;
};

const updateProductRules = () => {
  const updateRules = [
    param("id")
      .notEmpty()
      .isNumeric()
      .custom((value) => {
        if (value <= 0) {
          throw new Error("Product id must be a valid number");
        }
      })
      .withMessage("id should be Numeric"),
    ...rules,
  ];

  return updateRules;
};

const deleteProductRules = () => {
  const deleteRules = [
    body("keyword").notEmpty().withMessage("Keyword is required"),
    ...rules,
  ];

  return deleteRules;
};
module.exports = { addProductRules, updateProductRules, deleteProductRules };
