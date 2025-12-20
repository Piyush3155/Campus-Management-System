import { Injectable, ConflictException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          username: true,
          phone: true,
          role: true,
          isActive: true,
          isVerified: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip,
        take: limit,
      }),
      this.prisma.user.count(),
    ]);

    return {
      users,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
        phone: true,
        role: true,
        isActive: true,
        isVerified: true,
        profileImageUrl: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findByFirebaseUid(firebaseUid: string) {
    return this.prisma.user.findUnique({
      where: { firebaseUid },
    });
  }

  async findByIdWithRoles(userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        roles: {
          include: {
            role: true,
          },
        },
      },
    });
  }

  /**
   * Create a student via Firebase (Google Login)
   * Students are auto-created on first login
   */
  async createStudent(data: {
    firebaseUid: string;
    email: string;
    name: string;
    profileImageUrl?: string;
  }) {
    // Check if email already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    return this.prisma.user.create({
      data: {
        firebaseUid: data.firebaseUid,
        email: data.email,
        name: data.name,
        profileImageUrl: data.profileImageUrl,
        role: 'STUDENT',
        isVerified: true, // Firebase already verified email
        isActive: true,
      },
    });
  }

  /**
   * Create a staff member (by Admin)
   */
  async createStaff(data: {
    name: string;
    username: string;
    email: string;
    password: string;
    phone?: string;
    createdById?: string;
  }) {
    const { username, email } = data;

    // Check for existing user
    const existing = await this.prisma.user.findFirst({
      where: {
        OR: [
          { username },
          { email },
        ],
      },
    });

    if (existing) {
      if (existing.username === username) {
        throw new ConflictException('Username already exists');
      }
      if (existing.email === email) {
        throw new ConflictException('Email already exists');
      }
    }

    return this.prisma.user.create({
      data: {
        name: data.name,
        username: data.username,
        email: data.email,
        password: data.password,
        phone: data.phone,
        role: 'STAFF',
        isActive: true,
        createdById: data.createdById,
      },
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
    });
  }

  /**
   * Deactivate/Activate a user
   */
  async setActiveStatus(userId: string, isActive: boolean) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { isActive },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
      },
    });
  }

  /**
   * Delete a user (soft delete by deactivating, or hard delete)
   */
  async deleteUser(userId: string) {
    // Soft delete - just deactivate the user
    return this.prisma.user.update({
      where: { id: userId },
      data: { isActive: false },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
      },
    });
  }

  async storeFcmToken(userId: string, token: string, deviceType: string = 'WEB') {
    // First, check if token already exists for this user and device
    const existingToken = await this.prisma.userTokens.findFirst({
      where: {
        userId,
        deviceType: deviceType as any,
      },
    });

    if (existingToken) {
      // Update existing token
      return this.prisma.userTokens.update({
        where: { id: existingToken.id },
        data: { token, lastUsed: new Date() },
      });
    } else {
      // Create new token
      return this.prisma.userTokens.create({
        data: {
          userId,
          token,
          deviceType: deviceType as any,
        },
      });
    }
  }

  // Legacy method - kept for compatibility
  async create(data: { name: string; username: string; email: string; password: string; phone?: string }) {
    const { username, email } = data;

    // Pre-check to provide clear errors and avoid Prisma constraint failures
    const existing = await this.prisma.user.findFirst({
      where: {
        OR: [
          { username },
          { email },
        ],
      },
    });

    if (existing) {
      if (existing.username === username) {
        throw new ConflictException('Username already exists');
      }
      if (existing.email === email) {
        throw new ConflictException('Email already exists');
      }
      // Fallback
      throw new ConflictException('User already exists');
    }

    try {
      return await this.prisma.user.create({
        data: {
          ...data,
          role: 'STAFF', // Default to STAFF for manual creation
        },
      });
    } catch (err: any) {
      // Handle Prisma unique constraint error as a conflict
      if (err?.code === 'P2002') {
        const target = err?.meta?.target || [];
        if (Array.isArray(target) && target.includes('username')) {
          throw new ConflictException('Username already exists');
        }
        if (Array.isArray(target) && target.includes('email')) {
          throw new ConflictException('Email already exists');
        }
        throw new ConflictException('Duplicate value for unique field');
      }
      // Re-throw other errors as bad requests
      throw new BadRequestException(err?.message || 'Failed to create user');
    }
  }
}

