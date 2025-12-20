// Department types matching backend
export type DepartmentStatus = 'ACTIVE' | 'INACTIVE';

export interface Department {
  id: string;
  name: string;
  status: DepartmentStatus;
  createdAt: string;
  updatedAt: string;
  users?: DepartmentUser[];
}

export interface DepartmentUser {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'STAFF' | 'STUDENT';
}

export interface CreateDepartmentData {
  name: string;
  status?: DepartmentStatus;
}

export interface UpdateDepartmentData {
  name?: string;
  status?: DepartmentStatus;
}
