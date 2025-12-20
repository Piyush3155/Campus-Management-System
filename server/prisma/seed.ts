import * as bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Seed the database with initial data
 * - Roles
 * - Admin
 * - Staff
 * - Student (demo user)
 */
async function main() {
  console.log('🌱 Starting database seed...\n');

  // ===========================
  // SEED ROLES
  // ===========================
  console.log('📋 Creating roles...');

  const roles = ['ADMIN', 'STAFF', 'STUDENT'] as const;

  for (const roleName of roles) {
    await prisma.role.upsert({
      where: { name: roleName },
      update: {},
      create: {
        name: roleName,
        description: `${roleName.charAt(0)}${roleName.slice(1).toLowerCase()} role`,
      },
    });
    console.log(`   ✓ Role: ${roleName}`);
  }

  // ===========================
  // SEED ADMIN USER
  // ===========================
  console.log('\n👑 Creating admin user...');

  const adminEmail = process.env.ADMIN_EMAIL || 'admin@campus.edu';
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123456';
  const adminUsername = process.env.ADMIN_USERNAME || 'admin';

  const adminHashedPassword = await bcrypt.hash(adminPassword, 12);

  const adminUser = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      password: adminHashedPassword,
      isActive: true,
    },
    create: {
      name: 'System Administrator',
      email: adminEmail,
      username: adminUsername,
      password: adminHashedPassword,
      role: 'ADMIN',
      isActive: true,
      isVerified: true,
    },
  });

  console.log(`   ✓ Admin created: ${adminUser.email}`);

  // Assign ADMIN role
  const adminRole = await prisma.role.findUnique({
    where: { name: 'ADMIN' },
  });

  if (adminRole) {
    await prisma.userRole.upsert({
      where: {
        userId_roleId: {
          userId: adminUser.id,
          roleId: adminRole.id,
        },
      },
      update: {},
      create: {
        userId: adminUser.id,
        roleId: adminRole.id,
      },
    });
    console.log('   ✓ Admin role assigned');
  }

  // ===========================
  // SEED STAFF USER
  // ===========================
  console.log('\n👨‍💼 Creating staff user...');

  const staffEmail = 'staff@campus.edu';
  const staffPassword = 'Staff@123';
  const staffUsername = 'staff';

  const staffHashedPassword = await bcrypt.hash(staffPassword, 12);

  const staffUser = await prisma.user.upsert({
    where: { email: staffEmail },
    update: {},
    create: {
      name: 'Campus Staff',
      email: staffEmail,
      username: staffUsername,
      password: staffHashedPassword,
      role: 'STAFF',
      isActive: true,
      isVerified: true,
    },
  });

  console.log(`   ✓ Staff created: ${staffUser.email}`);

  // Assign STAFF role
  const staffRole = await prisma.role.findUnique({
    where: { name: 'STAFF' },
  });

  if (staffRole) {
    await prisma.userRole.upsert({
      where: {
        userId_roleId: {
          userId: staffUser.id,
          roleId: staffRole.id,
        },
      },
      update: {},
      create: {
        userId: staffUser.id,
        roleId: staffRole.id,
      },
    });
    console.log('   ✓ Staff role assigned');
  }

  // ===========================
  // SEED STUDENT USER (DEMO)
  // ===========================
  console.log('\n🎓 Creating student user (demo)...');

  const studentEmail = 'student@novatech.edu';
  const studentPassword = 'Student@123';
  const studentUsername = 'student1';

  const studentHashedPassword = await bcrypt.hash(studentPassword, 12);

  const studentUser = await prisma.user.upsert({
    where: { email: studentEmail },
    update: {},
    create: {
      name: 'Demo Student',
      email: studentEmail,
      username: studentUsername,
      password: studentHashedPassword,
      role: 'STUDENT',
      isActive: true,
      isVerified: true,
    },
  });

  console.log(`   ✓ Student created: ${studentUser.email}`);

  // Assign STUDENT role
  const studentRole = await prisma.role.findUnique({
    where: { name: 'STUDENT' },
  });

  if (studentRole) {
    await prisma.userRole.upsert({
      where: {
        userId_roleId: {
          userId: studentUser.id,
          roleId: studentRole.id,
        },
      },
      update: {},
      create: {
        userId: studentUser.id,
        roleId: studentRole.id,
      },
    });
    console.log('   ✓ Student role assigned');
  }

  // ===========================
  // SUMMARY
  // ===========================
  console.log('\n✅ Database seed completed successfully!\n');
  console.log('='.repeat(50));
  console.log('LOGIN CREDENTIALS (DEMO)');
  console.log('='.repeat(50));
  console.log('ADMIN   → admin@campus.edu   | Admin@123456');
  console.log('STAFF   → staff@campus.edu   | Staff@123');
  console.log('STUDENT → student@novatech.edu | Student@123');
  console.log('='.repeat(50));
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Seed failed:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
