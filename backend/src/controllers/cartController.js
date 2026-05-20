const prisma = require("../lib/prisma");

exports.getCart = async (req, res) => {
  try {
    const cart = await prisma.cartItem.findMany({
      include: {
        product: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const { productId } = req.body;

    const existing = await prisma.cartItem.findFirst({
      where: {
        productId: Number(productId),
      },
    });

    if (existing) {
      const updated = await prisma.cartItem.update({
        where: { id: existing.id },
        data: {
          quantity: existing.quantity + 1,
        },
      });

      return res.json(updated);
    }

    const cart = await prisma.cartItem.create({
      data: {
        productId: Number(productId),
        quantity: 1,
      },
    });

    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCartQty = async (req, res) => {
  try {
    const { quantity } = req.body;

    const cart = await prisma.cartItem.update({
      where: { id: Number(req.params.id) },
      data: {
        quantity: Number(quantity),
      },
    });

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteCartItem = async (req, res) => {
  try {
    await prisma.cartItem.delete({
      where: { id: Number(req.params.id) },
    });

    res.json({ message: "Item removed from cart" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.clearCart = async (req, res) => {
  try {
    await prisma.cartItem.deleteMany();

    res.json({ message: "Cart cleared successfully" });
  } catch (error) {
    console.error("CLEAR CART ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};
