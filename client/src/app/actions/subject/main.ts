"use server";

import { secureApiClient } from '@/lib/secure-api';
import type { ActionResult } from '@/lib/auth-types';
import type { Subject } from './types';

/**
 * Fetch all subjects
 */
export async function fetchSubjects(): Promise<ActionResult<Subject[]>> {
    try {
        const response = await secureApiClient.get<Subject[]>('/subjects');

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
        console.error('Fetch subjects error:', error);
        return {
            success: false,
            error: 'Failed to fetch subjects',
        };
    }
}
