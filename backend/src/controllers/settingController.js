const prisma = require("../lib/prisma");

exports.getSetting = async (req, res) => {
  try {
    let setting = await prisma.storeSetting.findFirst();

    if (!setting) {
      setting = await prisma.storeSetting.create({
        data: {
          storeName: "Petals & Poetry",
          contactEmail: "admin@petals.com",
          currency: "IDR",
          timezone: "Asia/Jakarta",
          description: "Artisanal floral arrangements.",
          logo: "",
        },
      });
    }

    res.json(setting);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateSetting = async (req, res) => {
  try {
    let setting = await prisma.storeSetting.findFirst();

    const logoPath = req.file ? `http://localhost:5000/uploads/${req.file.filename}` : req.body.logo || setting?.logo || "";

    if (!setting) {
      setting = await prisma.storeSetting.create({
        data: {
          storeName: req.body.storeName,
          contactEmail: req.body.contactEmail,
          currency: req.body.currency,
          timezone: req.body.timezone,
          description: req.body.description,
          logo: logoPath,
        },
      });
    } else {
      setting = await prisma.storeSetting.update({
        where: { id: setting.id },
        data: {
          storeName: req.body.storeName,
          contactEmail: req.body.contactEmail,
          currency: req.body.currency,
          timezone: req.body.timezone,
          description: req.body.description,
          logo: logoPath,
        },
      });
    }

    res.json(setting);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
