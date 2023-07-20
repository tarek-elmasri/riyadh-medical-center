const { PrismaClient } = require("@prisma/client");
const bcrypt = require('bcrypt')


const prisma = new PrismaClient();
const SALT = process.env.PASSWORD_SALT

const main = async () => {
  await prisma.user.create({
    data: {
      name: "tarek",
      email: "tarek@gmail.com",
      isAdmin: true,
      password: await bcrypt.hash("123456" + SALT, 12),
    },
  });
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })

  .catch(async (e) => {
    console.error(e);

    await prisma.$disconnect();

    process.exit(1);
  });
