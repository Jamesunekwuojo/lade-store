import "dotenv/config";
import { prisma } from "../lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
  const email = process.env.ADMIN_SEED_EMAIL || "admin@ladeempire.com";
  const password = process.env.ADMIN_SEED_PASSWORD || "LadeEmpire2026!";
  const name = process.env.ADMIN_SEED_NAME || "LADÉ EMPIRE Admin";

  console.log(`[Admin Seed] Preparing admin user for email: ${email}`);

  const saltRounds = 12;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const admin = await prisma.adminUser.upsert({
    where: { email: email.toLowerCase() },
    update: {
      passwordHash,
      name,
    },
    create: {
      email: email.toLowerCase(),
      passwordHash,
      name,
    },
  });

  console.log(`[Admin Seed] Admin user successfully created/updated: ${admin.email} (ID: ${admin.id})`);
}

main()
  .catch((err) => {
    console.error("[Admin Seed Error]:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
