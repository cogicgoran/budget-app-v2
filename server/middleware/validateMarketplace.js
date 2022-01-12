function validateMarketplace(req, res, next) {
  const { name, address } = req.body;
  if (typeof name === 'string' && name && name.length > 0 && typeof address === 'string' && address && address.length > 0) {
    return next();
  }
  return res.status(400).send("INVALID MARKETPLACE INFO");
};

module.exports = validateMarketplace;