const bcrypt = require("bcryptjs");
const prisma = require("../lib/prisma");

exports.getCustomers = async (req, res) => {
  try {
    const customers = await prisma.user.findMany({
      where: { role: "customer" },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createCustomer = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await prisma.user.findUnique({
      where: { email },
    });

    if (exists) {
      return res.status(400).json({ message: "Email sudah terdaftar" });
    }

    const hashedPassword = await bcrypt.hash(password || "123456", 10);

    const customer = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "customer",
      },
    });

    res.status(201).json(customer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCustomer = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const data = {
      name,
      email,
    };

    if (password) {
      data.password = await bcrypt.hash(password, 10);
    }

    const customer = await prisma.user.update({
      where: { id: Number(req.params.id) },
      data,
    });

    res.json(customer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteCustomer = async (req, res) => {
  try {
    await prisma.user.delete({
      where: { id: Number(req.params.id) },
    });

    res.json({ message: "Customer berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
