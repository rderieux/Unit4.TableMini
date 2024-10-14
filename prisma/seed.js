const { faker } = require("@faker-js/faker");
const prisma = require("../prisma");

const seed = async (numOfRestaurants = 3, numOfReservations = 5) => {
  // TODO: Create 3 restaurants with 5 reservations each
  // Loop through 3 restaurants
  for (let i = 0; i < numOfRestaurants; i++) {
    //const reservations = [];
    // Loop through 5 reservations
    // for (ii = 0; ii < numOfReservations; ii++) {
    //   reservations.push({
    //     name: `Person ${i}${ii}`,
    //     email: `${i}${ii}@email.com`,
    //     partySize: Math.floor(Math.random() * 10) + 1,
    //   });
    // }
    // Create a single restaurant with nested reservations
    // Above code depricated for below code
    const reservations = Array.from({ length: numOfReservations }, () => ({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      partySize: faker.number.int({ min: 1, max: 15 }),
    }));

    await prisma.restaurant.create({
      data: {
        name: faker.company.buzzAdjective() + " " + faker.company.buzzNoun(),
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
