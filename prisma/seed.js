const prisma = require("../prisma");
const seed = async () => {
  // TODO: Create 3 restaurants with 5 reservations each
  // Loop through 3 restaurants
  for (i = 0; i < 3; i++) {
    const reservations = [];
    // Loop through 5 reservations
    for (ii = 0; ii < 5; ii++) {
      reservations.push({
        name: `Person ${i}${ii}`,
        email: `${i}${ii}@email.com`,
        partySize: Math.floor(Math.random() * 10) + 1,
      });
    }
    // Create a single restaurant with nested reservations
    await prisma.restaurant.create({
      data: {
        name: `Restaurant ${i + 1}`,
        reservations: {
          create: reservations,
        },
      },
    });
  }
};
seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
