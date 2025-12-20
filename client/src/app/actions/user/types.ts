// User types matching backend
export interface User {
  id: string;
  name: string;
  email: string;
  username?: string;
  phone?: string;
  role: 'ADMIN' | 'STAFF' | 'STUDENT';
  isActive: boolean;
  isVerified: boolean;
  profileImageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UsersResponse {
  users: User[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface StaffStats {
  totalStaff: number;
  activeStaff: number;
  inactiveStaff: number;
  departments: number;
  avgWorkload: number;
}

export interface CreateStaffData {
  name: string;
  username: string;
  email: string;
  password: string;
  phone?: string;
}
