import { Injectable, UnauthorizedException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import * as admin from 'firebase-admin';
import { CredentialLoginDto, FirebaseLoginDto, CreateStaffDto, AuthResponse } from './dto';

// Initialize Firebase Admin SDK (only once)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

@Injectable()
export class AuthService {
  // Configurable college email domain
  private readonly allowedEmailDomain = process.env.ALLOWED_EMAIL_DOMAIN || '@college.edu';

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  /**
   * Validate Admin/Staff credentials
   */
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    
    if (!user) {
      return null;
    }

    // Validate auth method - Admin/Staff must use password
    if (user.role === 'STUDENT') {
      throw new ForbiddenException('Students must login via Google');
    }

    // Admin/Staff must have password
    if (!user.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return null;
    }

    // Check if user is active
    if (!user.isActive) {
      throw new ForbiddenException('Account is deactivated');
    }

    const { password: _, ...result } = user;
    return result;
  }

  /**
   * Admin/Staff Login with credentials
   */
  async loginWithCredentials(loginDto: CredentialLoginDto): Promise<AuthResponse> {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return this.generateAuthResponse(user);
  }

  /**
   * Student Login with Firebase (Google)
   */
  async loginWithFirebase(loginDto: FirebaseLoginDto): Promise<AuthResponse> {
    try {
      // Verify Firebase ID token
      const decodedToken = await admin.auth().verifyIdToken(loginDto.idToken);
      const { uid, email, name, picture } = decodedToken;

      if (!email) {
        throw new BadRequestException('Email is required');
      }

      // Validate email domain (only college students allowed)
      if (!email.endsWith(this.allowedEmailDomain)) {
        throw new ForbiddenException(`Only ${this.allowedEmailDomain} email addresses are allowed`);
      }

      // Check if user exists
      let user = await this.usersService.findByFirebaseUid(uid);

      if (user) {
        // Existing user - validate role
        if (user.role !== 'STUDENT') {
          throw new ForbiddenException('Invalid auth method for this account');
        }

        if (!user.isActive) {
          throw new ForbiddenException('Account is deactivated');
        }
      } else {
        // First-time login - create student account
        user = await this.usersService.createStudent({
          firebaseUid: uid,
          email,
          name: name || email.split('@')[0],
          profileImageUrl: picture,
        });
      }

      return this.generateAuthResponse(user);
    } catch (error) {
      if (error instanceof ForbiddenException || error instanceof BadRequestException) {
        throw error;
      }
      throw new UnauthorizedException('Invalid Firebase token');
    }
  }

  /**
   * Create Staff by Admin
   */
  async createStaff(createStaffDto: CreateStaffDto, adminId: string): Promise<any> {
    const hashedPassword = await bcrypt.hash(createStaffDto.password, 12);
    
    return this.usersService.createStaff({
      ...createStaffDto,
      password: hashedPassword,
      createdById: adminId,
    });
  }

  /**
   * Generate JWT and auth response
   */
  private async generateAuthResponse(user: any): Promise<AuthResponse> {
    const payload = { 
      sub: user.id,
      email: user.email,
      role: user.role,
    };
    
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        username: user.username,
        role: user.role,
        isActive: user.isActive,
      },
    };
  }

  /**
   * Refresh token
   */
  async refresh(token: string): Promise<AuthResponse> {
    try {
      const payload = this.jwtService.verify(token);
      const user = await this.usersService.findById(payload.sub);
      
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      if (!user.isActive) {
        throw new ForbiddenException('Account is deactivated');
      }

      return this.generateAuthResponse(user);
    } catch (error) {
      if (error instanceof ForbiddenException) {
        throw error;
      }
      throw new UnauthorizedException('Invalid token');
    }
  }

  /**
   * Validate JWT token and return user
   */
  async validateToken(token: string): Promise<any> {
    try {
      const payload = this.jwtService.verify(token);
      const user = await this.usersService.findById(payload.sub);
      
      if (!user || !user.isActive) {
        return null;
      }

      return user;
    } catch {
      return null;
    }
  }
}