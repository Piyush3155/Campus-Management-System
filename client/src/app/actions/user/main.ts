"use server";

import { secureApiClient } from '@/lib/secure-api';
import type { ActionResult } from '@/lib/auth-types';
import type { User, UsersResponse, CreateStaffData, StaffStats } from './types';

// Re-export types for convenience
export type { User, UsersResponse, CreateStaffData } from './types';
export type { StaffStats } from './types';

/**
 * Fetch users with pagination
 */
export async function fetchUsers(page: number = 1, limit: number = 10): Promise<ActionResult<UsersResponse>> {
  try {
    const response = await secureApiClient.get<UsersResponse>(`/users?page=${page}&limit=${limit}`);

    if (response.error) {
      return {
        success: false,
        error: response.error,
      };
    }

    return {
      success: true,
      data: response.data!,
    };
  } catch (error) {
    console.error('Fetch users error:', error);
    return {
      success: false,
      error: 'Failed to fetch users',
    };
  }
}

/**
 * Fetch staff members with pagination
 */
export async function fetchStaff(page: number = 1, limit: number = 10): Promise<ActionResult<UsersResponse>> {
  try {
    const response = await secureApiClient.get<UsersResponse>(`/users?page=${page}&limit=${limit}&role=staff`);

    if (response.error) {
      return {
        success: false,
        error: response.error,
      };
    }

    return {
      success: true,
      data: response.data!,
    };
  } catch (error) {
    console.error('Fetch staff error:', error);
    return {
      success: false,
      error: 'Failed to fetch staff',
    };
  }
}

/**
 * Fetch staff statistics
 */
export async function fetchStaffStats(): Promise<ActionResult<StaffStats>> {
  try {
    const response = await secureApiClient.get<StaffStats>('/users/stats');

    if (response.error) {
      return {
        success: false,
        error: response.error,
      };
    }

    return {
      success: true,
      data: response.data!,
    };
  } catch (error) {
    console.error('Fetch staff stats error:', error);
    return {
      success: false,
      error: 'Failed to fetch staff stats',
    };
  }
}

/**
 * Create a new staff member (Admin only)
 */
export async function createStaff(staffData: CreateStaffData): Promise<ActionResult<User>> {
  try {
    const response = await secureApiClient.post<User>('/auth/staff', staffData);

    if (response.error) {
      return {
        success: false,
        error: response.error,
      };
    }

    return {
      success: true,
      data: response.data!,
    };
  } catch (error) {
    console.error('Create staff error:', error);
    return {
      success: false,
      error: 'Failed to create staff member',
    };
  }
}

/**
 * Update user active status
 */
export async function updateUserStatus(userId: string, isActive: boolean): Promise<ActionResult<User>> {
  try {
    // Note: This endpoint doesn't exist yet in the backend
    // We'll need to add a PATCH /users/:id/status endpoint
    const response = await secureApiClient.patch<User>(`/users/${userId}/status`, { isActive });

    if (response.error) {
      return {
        success: false,
        error: response.error,
      };
    }

    return {
      success: true,
      data: response.data!,
    };
  } catch (error) {
    console.error('Update user status error:', error);
    return {
      success: false,
      error: 'Failed to update user status',
    };
  }
}

/**
 * Delete/deactivate a user
 */
export async function deleteUser(userId: string): Promise<ActionResult<void>> {
  try {
    // Note: This endpoint doesn't exist yet in the backend
    // We'll need to add a DELETE /users/:id endpoint
    const response = await secureApiClient.delete<void>(`/users/${userId}`);

    if (response.error) {
      return {
        success: false,
        error: response.error,
      };
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error('Delete user error:', error);
    return {
      success: false,
      error: 'Failed to delete user',
    };
  }
}
