// import prisma from "../lib/prisma";
import { PrismaClient } from "../app/generated/prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.feed.createMany({
    data: [
      { url: "https://hnrss.org/frontpage", title: "Hacker News" },
      { url: "https://xkcd.com/atom.xml", title: "xkcd" },
    ],
    skipDuplicates: true,
  });
}

main()
  .then(() => process.exit(0))
  .catch(e => {
    console.error(e);
    process.exit(1);
  });
