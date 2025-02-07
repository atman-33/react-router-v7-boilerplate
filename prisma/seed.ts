import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
  // 既存のDBデータを削除
  await prisma.contact.deleteMany();

  // Contactのダミーデータを追加
  const contacts = Array.from({ length: 10 }).map(() => ({
    first: faker.person.firstName(),
    last: faker.person.lastName(),
    avatar: faker.image.avatar(),
    twitter: faker.internet.username(),
    notes: faker.lorem.sentence(),
    favorite: faker.datatype.boolean(),
  }));

  await prisma.contact.createMany({
    data: contacts,
  });
};

console.log('🚀 Starting Prisma seed...');

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log('🎉 Prisma seed completed!');
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
