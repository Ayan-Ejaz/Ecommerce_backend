const verifyAdminRole = (request, response, next) => {
  if (request.user?.role === "admin") {
    return next();
  }
  return response.status(403).json({ error: "Unauthorized. Admins only" });
};

module.exports = verifyAdminRole;
