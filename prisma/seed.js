const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const people = [
  {
    slug: "tran-ngoc-thu",
    name: "Trần Ngọc Thu",
    avatarUrl: "",
    facebookUrl: "https://facebook.com/",
    shopBioUrl: "https://dichvu.baostar.pro/",
    telegramUrl: "https://t.me/",
    supportLevel: "Xuất sắc",
    trustScore: 100,
    trustScoreMax: 100,
    joinDate: "17/04/2021",
    transactionLimit: "dưới 10 triệu",
    services:
      "Hỗ trợ nhiệt tình, chu đáo 24/24.\nBảo mật thông tin khách hàng tuyệt đối 100%.\nDịch vụ Social Media: Facebook, Youtube, Shopee, Twitter, Google, Tiktok, Instagram, Telegram...",
    bankAccounts: JSON.stringify([
      { bank: "Vietcombank", account: "18.333.99999" },
      { bank: "Mbbank", account: "1999168168168" },
    ]),
    order: 4,
  },
  {
    slug: "nguyen-hoang-duong",
    name: "Nguyễn Hoàng Dương",
    avatarUrl: "",
    supportLevel: "Xuất sắc",
    trustScore: 98,
    trustScoreMax: 100,
    joinDate: "02/01/2022",
    transactionLimit: "dưới 20 triệu",
    services: "Trung gian giao dịch uy tín.\nHỗ trợ mọi khung giờ.",
    bankAccounts: JSON.stringify([{ bank: "ACB", account: "8888123456" }]),
    order: 1,
  },
];

async function main() {
  for (const p of people) {
    await prisma.person.upsert({
      where: { slug: p.slug },
      update: p,
      create: p,
    });
  }
  console.log(`Seeded ${people.length} people.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
