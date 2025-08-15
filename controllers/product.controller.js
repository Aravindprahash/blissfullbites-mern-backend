const Product = require('../models/Product');

exports.getAll = async (req, res) => {
  try {
    const products = await Product.find();

    const normalized = products.map((p) => ({
      ...p._doc,
      image: p.image || p.images,  
    }));

    res.json(normalized);
  } catch (err) {
    res.status(500).json({ message: 'Fetch failed' });
  }
};

exports.getById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.create = async (req, res) => {
  try {
  
    if (!req.body.images && req.body.image) {
      req.body.images = req.body.image;
    }

    const product = new Product(req.body);
    await product.save();
    res.status(201).json({ message: 'Created', product });
  } catch (err) {
    res.status(500).json({ message: 'Create failed' });
  }
};

exports.update = async (req, res) => {
  try {
    if (!req.body.images && req.body.image) {
      req.body.images = req.body.image;
    }

    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: 'Updated', product });
  } catch (err) {
    res.status(500).json({ message: 'Update failed' });
  }
};

exports.remove = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Delete failed' });
  }
};
