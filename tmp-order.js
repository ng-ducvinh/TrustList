const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const rows = await prisma.person.findMany({
    orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
  });

  for (let i = 0; i < rows.length; i += 1) {
    await prisma.person.update({
      where: { id: rows[i].id },
      data: { order: i + 1 },
    });
  }

  const updated = await prisma.person.findMany({
    orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
    select: { name: true, order: true },
  });

  console.log(JSON.stringify(updated, null, 2));
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
