import * as bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Seed the database with initial data
 * - Admin user (system user, no Firebase)
 * - Roles for RBAC
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
        description: `${roleName.charAt(0) + roleName.slice(1).toLowerCase()} role`,
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
  
  const hashedPassword = await bcrypt.hash(adminPassword, 12);
  
  const adminUser = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      password: hashedPassword,
      isActive: true,
    },
    create: {
      name: 'System Administrator',
      email: adminEmail,
      username: adminUsername,
      password: hashedPassword,
      role: 'ADMIN',
      isActive: true,
      isVerified: true,
    },
  });
  
  console.log(`   ✓ Admin created: ${adminUser.email}`);
  console.log(`   📧 Email: ${adminEmail}`);
  console.log(`   🔑 Password: ${adminPassword}`);
  console.log('\n   ⚠️  IMPORTANT: Change the admin password after first login!\n');

  // Assign admin role via UserRole junction table (for legacy compatibility)
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

  console.log('\n✅ Database seed completed successfully!\n');
  console.log('='.repeat(50));
  console.log('AUTHENTICATION SUMMARY:');
  console.log('='.repeat(50));
  console.log('ADMIN:    Email/Password login (system credentials)');
  console.log('STAFF:    Email/Password login (created by Admin)');
  console.log('STUDENT:  Google Login via Firebase (college email only)');
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
