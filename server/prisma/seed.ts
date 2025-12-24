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
  // SEED DEPARTMENTS
  // ===========================
  console.log('\n🏢 Creating departments...');

  const departmentsData = [
    { name: 'Computer Science', code: 'CS' },
    { name: 'Business Administration', code: 'BA' },
    { name: 'Commerce', code: 'COM' },
    { name: 'Science', code: 'SCI' },
    { name: 'Arts', code: 'ART' },
  ];

  const departments = [];
  for (const dept of departmentsData) {
    const department = await prisma.department.upsert({
      where: { name: dept.name },
      update: {},
      create: {
        name: dept.name,
      },
    });
    departments.push(department);
    console.log(`   ✓ Department: ${dept.name}`);
  }

  // ===========================
  // ASSIGN DEPARTMENTS TO EXISTING USERS
  // ===========================
  console.log('\n👥 Assigning departments to existing users...');

  // Assign Computer Science department to staff
  const csDept = departments.find(d => d.name === 'Computer Science');
  if (csDept) {
    await prisma.user.update({
      where: { email: staffEmail },
      data: { departmentId: csDept.id },
    });
    console.log('   ✓ Assigned Computer Science department to staff');
  }

  // Assign Computer Science department to student
  if (csDept) {
    await prisma.user.update({
      where: { email: studentEmail },
      data: { departmentId: csDept.id },
    });
    console.log('   ✓ Assigned Computer Science department to student');
  }

  // ===========================
  // CREATE ADDITIONAL STAFF USERS FOR EACH DEPARTMENT
  // ===========================
  console.log('\n👨‍🏫 Creating department-specific staff users...');

  const departmentStaffData = [
    {
      name: 'Dr. Rajesh Kumar',
      email: 'rajesh.cs@campus.edu',
      username: 'rajesh_cs',
      departmentName: 'Computer Science',
      subjects: ['BCA101', 'BCA102', 'BCA201']
    },
    {
      name: 'Prof. Priya Sharma',
      email: 'priya.ba@campus.edu',
      username: 'priya_ba',
      departmentName: 'Business Administration',
      subjects: ['BBA101', 'BBA102', 'BBA201']
    },
    {
      name: 'Dr. Amit Singh',
      email: 'amit.com@campus.edu',
      username: 'amit_com',
      departmentName: 'Commerce',
      subjects: ['BCOM101', 'BCOM102', 'BCOM201']
    },
    {
      name: 'Prof. Sunita Patel',
      email: 'sunita.sci@campus.edu',
      username: 'sunita_sci',
      departmentName: 'Science',
      subjects: ['MATH101', 'MATH102']
    },
    {
      name: 'Dr. Vikram Rao',
      email: 'vikram.art@campus.edu',
      username: 'vikram_art',
      departmentName: 'Arts',
      subjects: ['ENG101', 'ENG102']
    },
  ];

  const departmentStaff = [];
  for (const staffData of departmentStaffData) {
    const department = departments.find(d => d.name === staffData.departmentName);
    if (!department) continue;

    const hashedPassword = await bcrypt.hash('Staff@123', 12);

    const newStaff = await prisma.user.upsert({
      where: { email: staffData.email },
      update: {},
      create: {
        name: staffData.name,
        email: staffData.email,
        username: staffData.username,
        password: hashedPassword,
        role: 'STAFF',
        departmentId: department.id,
        isActive: true,
        isVerified: true,
      },
    });

    // Assign STAFF role
    const staffRole = await prisma.role.findUnique({
      where: { name: 'STAFF' },
    });

    if (staffRole) {
      await prisma.userRole.upsert({
        where: {
          userId_roleId: {
            userId: newStaff.id,
            roleId: staffRole.id,
          },
        },
        update: {},
        create: {
          userId: newStaff.id,
          roleId: staffRole.id,
        },
      });
    }

    departmentStaff.push({ ...newStaff, subjects: staffData.subjects });
    console.log(`   ✓ Created staff: ${staffData.name} (${staffData.departmentName})`);
  }

  // ===========================
  // ASSIGN DEPARTMENT HODS
  // ===========================
  console.log('\n👑 Assigning Department HODs...');

  const hodAssignments = [
    { departmentName: 'Computer Science', hodEmail: 'rajesh.cs@campus.edu' },
    { departmentName: 'Business Administration', hodEmail: 'priya.ba@campus.edu' },
    { departmentName: 'Commerce', hodEmail: 'amit.com@campus.edu' },
    { departmentName: 'Science', hodEmail: 'sunita.sci@campus.edu' },
    { departmentName: 'Arts', hodEmail: 'vikram.art@campus.edu' },
  ];

  for (const hodData of hodAssignments) {
    const department = departments.find(d => d.name === hodData.departmentName);
    const hodUser = departmentStaff.find(s => s.email === hodData.hodEmail);

    if (department && hodUser) {
      await prisma.departmentHOD.upsert({
        where: { departmentId: department.id },
        update: {},
        create: {
          departmentId: department.id,
          staffId: hodUser.id,
        },
      });
      console.log(`   ✓ Assigned ${hodUser.name} as HOD of ${hodData.departmentName}`);
    }
  }

  // ===========================
  // SEED COURSES
  // ===========================
  console.log('\n📚 Creating courses...');

  const coursesData = [
    // Computer Science Department
    { title: 'Bachelor of Computer Applications', code: 'BCA', departmentName: 'Computer Science', type: 'UNDERGRADUATE', duration: '3 Years', totalSemesters: 6, credits: 180 },
    { title: 'Bachelor of Science in Computer Science', code: 'BSc_CS', departmentName: 'Computer Science', type: 'UNDERGRADUATE', duration: '3 Years', totalSemesters: 6, credits: 180 },
    { title: 'Master of Computer Applications', code: 'MCA', departmentName: 'Computer Science', type: 'POSTGRADUATE', duration: '2 Years', totalSemesters: 4, credits: 120 },

    // Business Administration Department
    { title: 'Bachelor of Business Administration', code: 'BBA', departmentName: 'Business Administration', type: 'UNDERGRADUATE', duration: '3 Years', totalSemesters: 6, credits: 180 },
    { title: 'Master of Business Administration', code: 'MBA', departmentName: 'Business Administration', type: 'POSTGRADUATE', duration: '2 Years', totalSemesters: 4, credits: 120 },

    // Commerce Department
    { title: 'Bachelor of Commerce', code: 'BCom', departmentName: 'Commerce', type: 'UNDERGRADUATE', duration: '3 Years', totalSemesters: 6, credits: 180 },
    { title: 'Master of Commerce', code: 'MCom', departmentName: 'Commerce', type: 'POSTGRADUATE', duration: '2 Years', totalSemesters: 4, credits: 120 },

    // Science Department
    { title: 'Bachelor of Science in Mathematics', code: 'BSc_Math', departmentName: 'Science', type: 'UNDERGRADUATE', duration: '3 Years', totalSemesters: 6, credits: 180 },
    { title: 'Bachelor of Science in Physics', code: 'BSc_Physics', departmentName: 'Science', type: 'UNDERGRADUATE', duration: '3 Years', totalSemesters: 6, credits: 180 },

    // Arts Department
    { title: 'Bachelor of Arts in English', code: 'BA_English', departmentName: 'Arts', type: 'UNDERGRADUATE', duration: '3 Years', totalSemesters: 6, credits: 180 },
    { title: 'Bachelor of Arts in History', code: 'BA_History', departmentName: 'Arts', type: 'UNDERGRADUATE', duration: '3 Years', totalSemesters: 6, credits: 180 },
  ];

  const courses = [];
  for (const courseData of coursesData) {
    const department = departments.find(d => d.name === courseData.departmentName);
    if (!department) continue;

    const course = await prisma.course.upsert({
      where: { code: courseData.code },
      update: {},
      create: {
        title: courseData.title,
        code: courseData.code,
        description: `${courseData.title} program`,
        type: courseData.type as any,
        duration: courseData.duration,
        totalSemesters: courseData.totalSemesters,
        credits: courseData.credits,
        departmentId: department.id,
      },
    });
    courses.push(course);
    console.log(`   ✓ Course: ${courseData.code} - ${courseData.title}`);
  }

  // ===========================
  // SEED SUBJECTS
  // ===========================
  console.log('\n📖 Creating subjects...');

  const subjectsData = [
    // BCA Subjects
    { name: 'Programming in C', code: 'BCA101', departmentName: 'Computer Science', semester: 1, credits: 4 },
    { name: 'Data Structures', code: 'BCA102', departmentName: 'Computer Science', semester: 2, credits: 4 },
    { name: 'Database Management Systems', code: 'BCA201', departmentName: 'Computer Science', semester: 3, credits: 4 },
    { name: 'Web Technologies', code: 'BCA202', departmentName: 'Computer Science', semester: 4, credits: 4 },
    { name: 'Software Engineering', code: 'BCA301', departmentName: 'Computer Science', semester: 5, credits: 4 },
    { name: 'Mobile Application Development', code: 'BCA302', departmentName: 'Computer Science', semester: 6, credits: 4 },

    // BBA Subjects
    { name: 'Principles of Management', code: 'BBA101', departmentName: 'Business Administration', semester: 1, credits: 4 },
    { name: 'Business Mathematics', code: 'BBA102', departmentName: 'Business Administration', semester: 2, credits: 4 },
    { name: 'Financial Accounting', code: 'BBA201', departmentName: 'Business Administration', semester: 3, credits: 4 },
    { name: 'Marketing Management', code: 'BBA202', departmentName: 'Business Administration', semester: 4, credits: 4 },
    { name: 'Human Resource Management', code: 'BBA301', departmentName: 'Business Administration', semester: 5, credits: 4 },
    { name: 'Business Ethics', code: 'BBA302', departmentName: 'Business Administration', semester: 6, credits: 4 },

    // B.Com Subjects
    { name: 'Financial Accounting', code: 'BCOM101', departmentName: 'Commerce', semester: 1, credits: 4 },
    { name: 'Business Law', code: 'BCOM102', departmentName: 'Commerce', semester: 2, credits: 4 },
    { name: 'Cost Accounting', code: 'BCOM201', departmentName: 'Commerce', semester: 3, credits: 4 },
    { name: 'Income Tax', code: 'BCOM202', departmentName: 'Commerce', semester: 4, credits: 4 },
    { name: 'Auditing', code: 'BCOM301', departmentName: 'Commerce', semester: 5, credits: 4 },
    { name: 'Corporate Accounting', code: 'BCOM302', departmentName: 'Commerce', semester: 6, credits: 4 },

    // BSc Math Subjects
    { name: 'Calculus', code: 'MATH101', departmentName: 'Science', semester: 1, credits: 4 },
    { name: 'Linear Algebra', code: 'MATH102', departmentName: 'Science', semester: 2, credits: 4 },
    { name: 'Differential Equations', code: 'MATH201', departmentName: 'Science', semester: 3, credits: 4 },
    { name: 'Statistics', code: 'MATH202', departmentName: 'Science', semester: 4, credits: 4 },

    // BA English Subjects
    { name: 'English Literature', code: 'ENG101', departmentName: 'Arts', semester: 1, credits: 4 },
    { name: 'Creative Writing', code: 'ENG102', departmentName: 'Arts', semester: 2, credits: 4 },
    { name: 'American Literature', code: 'ENG201', departmentName: 'Arts', semester: 3, credits: 4 },
    { name: 'British Literature', code: 'ENG202', departmentName: 'Arts', semester: 4, credits: 4 },
  ];

  const subjects = [];
  for (const subjectData of subjectsData) {
    const department = departments.find(d => d.name === subjectData.departmentName);
    if (!department) continue;

    const subject = await prisma.subject.upsert({
      where: { code: subjectData.code },
      update: {},
      create: {
        name: subjectData.name,
        code: subjectData.code,
        credits: subjectData.credits,
        semester: subjectData.semester,
        departmentId: department.id,
      },
    });
    subjects.push(subject);
    console.log(`   ✓ Subject: ${subjectData.code} - ${subjectData.name}`);
  }

  // ===========================
  // ASSIGN STAFF TO SUBJECTS
  // ===========================
  console.log('\n👨‍🏫 Assigning staff to subjects...');

  // Collect all staff users
  const allStaff = await prisma.user.findMany({
    where: { role: 'STAFF' },
  });

  // Assign subjects to staff based on their department
  for (const staff of allStaff) {
    const staffWithDept = await prisma.user.findUnique({
      where: { id: staff.id },
      include: { department: true },
    });

    if (!staffWithDept?.department) continue;

    // Get subjects from the staff's department
    const deptSubjects = subjects.filter(s => s.departmentId === staffWithDept.department.id);

    // Assign some subjects to this staff (limit to 3-4 per staff)
    const subjectsToAssign = deptSubjects.slice(0, 4);

    for (const subject of subjectsToAssign) {
      await prisma.staffSubject.upsert({
        where: {
          staffId_subjectId: {
            staffId: staff.id,
            subjectId: subject.id,
          },
        },
        update: {},
        create: {
          staffId: staff.id,
          subjectId: subject.id,
        },
      });
      console.log(`   ✓ Assigned ${staffWithDept.name} to: ${subject.code} (${subject.name})`);
    }
  }

  // ===========================
  // SEED ACADEMIC YEAR
  // ===========================
  console.log('\n📅 Creating academic year...');

  const currentYear = new Date().getFullYear();
  const academicYear = await prisma.academicYear.upsert({
    where: { name: `${currentYear}-${currentYear + 1}` },
    update: {},
    create: {
      name: `${currentYear}-${currentYear + 1}`,
      startDate: new Date(currentYear, 5, 1), // June 1
      endDate: new Date(currentYear + 1, 4, 31), // May 31
      status: 'ACTIVE',
    },
  });

  console.log(`   ✓ Academic Year: ${academicYear.name}`);

  // ===========================
  // SUMMARY
  // ===========================
  console.log('\n✅ Database seed completed successfully!\n');
  console.log('='.repeat(50));
  console.log('LOGIN CREDENTIALS (DEMO)');
  console.log('='.repeat(50));
  console.log('ADMIN   → admin@campus.edu   | Admin@123456');
  console.log('');
  console.log('STAFF MEMBERS (All password: Staff@123):');
  console.log('  → staff@campus.edu (General)');
  console.log('  → rajesh.cs@campus.edu (Computer Science)');
  console.log('  → priya.ba@campus.edu (Business Administration)');
  console.log('  → amit.com@campus.edu (Commerce)');
  console.log('  → sunita.sci@campus.edu (Science)');
  console.log('  → ramesh.art@campus.edu (Arts)');
  console.log('');
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
