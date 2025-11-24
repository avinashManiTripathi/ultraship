export interface Employee {
  id: string;
  name: string;
  email: string;
  password: string;
  age: number;
  class: string;
  subjects: string[];
  attendance: number;
  role: 'admin' | 'employee';
  department: string;
  joinDate: string;
  phone: string;
  address: string;
  salary?: number;
  createdAt: string;
  updatedAt: string;
}

export interface EmployeeFilter {
  name?: string;
  class?: string;
  department?: string;
  minAge?: number;
  maxAge?: number;
  minAttendance?: number;
  maxAttendance?: number;
}

export interface EmployeeInput {
  name: string;
  email: string;
  password: string;
  age: number;
  class: string;
  subjects: string[];
  attendance: number;
  role: string;
  department: string;
  joinDate: string;
  phone: string;
  address: string;
  salary?: number;
}

export interface UpdateEmployeeInput {
  name?: string;
  email?: string;
  age?: number;
  class?: string;
  subjects?: string[];
  attendance?: number;
  role?: string;
  department?: string;
  phone?: string;
  address?: string;
  salary?: number;
}

