import { employees } from '../data/database';
import { requireAuth, requireAdmin } from '../auth/middleware';
import { EmployeeInput, UpdateEmployeeInput, EmployeeFilter } from '../models/Employee';

interface Context {
  user?: {
    id: string;
    email: string;
    role: 'admin' | 'employee';
  };
}

interface PaginationArgs {
  page?: number;
  pageSize?: number;
  sortField?: 'name' | 'age' | 'class' | 'attendance' | 'joinDate' | 'salary';
  sortOrder?: 'asc' | 'desc';
  filter?: EmployeeFilter;
}

function filterEmployees(filter?: EmployeeFilter) {
  if (!filter) return employees;

  return employees.filter((emp) => {
    if (filter.name && !emp.name.toLowerCase().includes(filter.name.toLowerCase())) {
      return false;
    }
    if (filter.class && !emp.class.toLowerCase().includes(filter.class.toLowerCase())) {
      return false;
    }
    if (filter.department && !emp.department.toLowerCase().includes(filter.department.toLowerCase())) {
      return false;
    }
    if (filter.minAge && emp.age < filter.minAge) {
      return false;
    }
    if (filter.maxAge && emp.age > filter.maxAge) {
      return false;
    }
    if (filter.minAttendance && emp.attendance < filter.minAttendance) {
      return false;
    }
    if (filter.maxAttendance && emp.attendance > filter.maxAttendance) {
      return false;
    }
    return true;
  });
}

function sortEmployees(
  employees: any[],
  sortField: string = 'name',
  sortOrder: string = 'asc'
) {
  return [...employees].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];

    // Handle string comparison
    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });
}

export const employeeResolvers = {
  Query: {
    employees: (_: any, { filter }: { filter?: EmployeeFilter }, context: Context) => {
      requireAuth(context);
      
      const filtered = filterEmployees(filter);
      
      // Remove passwords from response
      return filtered.map(({ password, ...emp }) => emp);
    },

    employee: (_: any, { id }: { id: string }, context: Context) => {
      requireAuth(context);
      
      const employee = employees.find((e) => e.id === id);
      
      if (!employee) {
        throw new Error('Employee not found');
      }

      const { password, ...employeeWithoutPassword } = employee;
      return employeeWithoutPassword;
    },

    employeesPaginated: (
      _: any,
      args: PaginationArgs,
      context: Context
    ) => {
      requireAuth(context);

      const {
        page = 1,
        pageSize = 10,
        sortField = 'name',
        sortOrder = 'asc',
        filter,
      } = args;

      // Filter employees
      let filtered = filterEmployees(filter);

      // Sort employees
      filtered = sortEmployees(filtered, sortField, sortOrder);

      // Calculate pagination
      const totalCount = filtered.length;
      const totalPages = Math.ceil(totalCount / pageSize);
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;

      // Get paginated results
      const paginatedEmployees = filtered.slice(startIndex, endIndex);

      // Remove passwords from response
      const employeesWithoutPasswords = paginatedEmployees.map(
        ({ password, ...emp }) => emp
      );

      return {
        employees: employeesWithoutPasswords,
        totalCount,
        page,
        pageSize,
        totalPages,
      };
    },
  },

  Mutation: {
    addEmployee: async (
      _: any,
      { input }: { input: EmployeeInput },
      context: Context
    ) => {
      requireAdmin(context);

      // Check if email already exists
      const existingEmployee = employees.find((e) => e.email === input.email);
      if (existingEmployee) {
        throw new Error('Email already exists');
      }

      const bcrypt = require('bcryptjs');
      const hashedPassword = await bcrypt.hash(input.password, 10);

      const newEmployee = {
        id: String(employees.length + 1),
        ...input,
        password: hashedPassword,
        role: input.role as 'admin' | 'employee',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      employees.push(newEmployee);

      const { password, ...employeeWithoutPassword } = newEmployee;
      return employeeWithoutPassword;
    },

    updateEmployee: (
      _: any,
      { id, input }: { id: string; input: UpdateEmployeeInput },
      context: Context
    ) => {
      requireAdmin(context);

      const employeeIndex = employees.findIndex((e) => e.id === id);

      if (employeeIndex === -1) {
        throw new Error('Employee not found');
      }

      // Check if email is being updated and if it already exists
      if (input.email) {
        const existingEmployee = employees.find(
          (e) => e.email === input.email && e.id !== id
        );
        if (existingEmployee) {
          throw new Error('Email already exists');
        }
      }

      employees[employeeIndex] = {
        ...employees[employeeIndex],
        ...input,
        updatedAt: new Date().toISOString(),
      };

      const { password, ...employeeWithoutPassword } = employees[employeeIndex];
      return employeeWithoutPassword;
    },

    deleteEmployee: (_: any, { id }: { id: string }, context: Context) => {
      requireAdmin(context);

      const employeeIndex = employees.findIndex((e) => e.id === id);

      if (employeeIndex === -1) {
        throw new Error('Employee not found');
      }

      employees.splice(employeeIndex, 1);
      return true;
    },

    updateMyProfile: (
      _: any,
      { input }: { input: UpdateEmployeeInput },
      context: Context
    ) => {
      const user = requireAuth(context);

      const employeeIndex = employees.findIndex((e) => e.id === user.id);

      if (employeeIndex === -1) {
        throw new Error('Employee not found');
      }

      // Employees can't update their own role
      if (input.role) {
        delete input.role;
      }

      employees[employeeIndex] = {
        ...employees[employeeIndex],
        ...input,
        updatedAt: new Date().toISOString(),
      };

      const { password, ...employeeWithoutPassword } = employees[employeeIndex];
      return employeeWithoutPassword;
    },
  },
};

