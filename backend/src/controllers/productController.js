const prisma = require("../lib/prisma");

exports.getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const imagePath = req.file ? `http://localhost:5000/uploads/${req.file.filename}` : "";

    const product = await prisma.product.create({
      data: {
        name: req.body.name,
        slug: req.body.slug,
        price: Number(req.body.price),
        description: req.body.description,
        image: imagePath,
        category: req.body.category,
        stock: Number(req.body.stock || 0),
        isActive: req.body.isActive === "true",
        occasion: req.body.occasion || "",
      },
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const imagePath = req.file ? `http://localhost:5000/uploads/${req.file.filename}` : req.body.oldImage;

    const product = await prisma.product.update({
      where: { id: Number(req.params.id) },
      data: {
        name: req.body.name,
        slug: req.body.slug,
        price: Number(req.body.price),
        description: req.body.description,
        image: imagePath,
        category: req.body.category,
        stock: Number(req.body.stock || 0),
        isActive: req.body.isActive === "true",
        occasion: req.body.occasion || "",
      },
    });

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await prisma.product.delete({
      where: { id: Number(req.params.id) },
    });

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
