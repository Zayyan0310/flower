const prisma = require("../lib/prisma");
const bcrypt = require("bcryptjs");

exports.getAdmins = async (req, res) => {
  try {
    const admins = await prisma.admin.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        createdAt: true,
      },
    });

    res.json(admins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createAdmin = async (req, res) => {
  try {
    const { name, email, password, role, status } = req.body;

    const hashPassword = await bcrypt.hash(password, 10);

    const admin = await prisma.admin.create({
      data: {
        name,
        email,
        password: hashPassword,
        role: role || "ADMIN",
        status: status || "ACTIVE",
      },
    });

    res.status(201).json({
      message: "Admin berhasil dibuat",
      admin,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateAdmin = async (req, res) => {
  try {
    const { name, email, password, role, status } = req.body;

    const data = {
      name,
      email,
      role,
      status,
    };

    if (password) {
      data.password = await bcrypt.hash(password, 10);
    }

    const admin = await prisma.admin.update({
      where: { id: Number(req.params.id) },
      data,
    });

    res.json({
      message: "Admin berhasil diupdate",
      admin,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteAdmin = async (req, res) => {
  try {
    await prisma.admin.delete({
      where: { id: Number(req.params.id) },
    });

    res.json({ message: "Admin berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
