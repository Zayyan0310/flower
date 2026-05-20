const bcrypt = require("bcryptjs");
const prisma = require("./src/lib/prisma");

async function main() {
  const hashedPassword = await bcrypt.hash("123456", 10);

  await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@gmail.com",
      password: hashedPassword,
      role: "admin",
    },
  });

  console.log("Admin berhasil dibuat");
}

main()
  .catch(console.log)
  .finally(async () => {
    await prisma.$disconnect();
  });
